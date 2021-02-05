import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {remote} from "electron";
//@ts-ignore
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
//@ts-ignore
import {vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism";
import fs from "fs";

import Project, {ProjectType, PackageManager} from "../models/project";
const dialog = remote.dialog;

const Root: React.FC = function() {
    const [maximized, setMaximized] = useState<boolean>(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [selected, setSelected] = useState<number | null>(null);
    const [md, setMd] = useState<string>("");
    const projCount = useRef(0);

    useEffect(() => {
        if(projects.length > 0 && projects.length > projCount.current) selectProject(projects.length -1);
    }, [projects]);
    
    const renderers = {
        code: (props: {language: any, value: any}) => {
            return <SyntaxHighlighter style={vscDarkPlus} language={props.language} children={props.value} />
        }
    }

    function maximizeWindow () {
        const window = remote.getCurrentWindow();
        if (!maximized) {
            window.maximize();
            setMaximized(true);
        } else {
            window.unmaximize();
            setMaximized(false);
        }
    }

    async function addProject() {
        await dialog.showOpenDialog(remote.getCurrentWindow(), {properties: ["openDirectory"], message: "Select a node project folder"}).then((path) => {
            const splitPath = path.filePaths[0].split("/");
            const newProject = {
                id: projects.length,
                name: splitPath[splitPath.length-1],
                pm: PackageManager.Unset,
                type: ProjectType.Other,
                path: path.filePaths[0]
            };
            projCount.current = projects.length;
            setProjects([
                ...projects,
                newProject]);
        });
    }

    async function removeProject(index: number) {
        if(index == selected) unselectProject();
        projects.splice(index, 1);
    }

    async function removeSelected() {
        removeProject(selected);
    }

    function unselectProject() {
        setSelected(null);
    }

    function selectProject(id: number) {
        const index = projects.findIndex((p) => p.id == id);
        setSelected(index);
        fs.readFile(projects[index].path + "/README.md", "utf-8", (err, data) => {
            if(err) {
                //alert("An error ocurred reading the file :" + err.message);
                //alert(err.message);
                dialog.showErrorBox("Error", "An error ocurred reading the file :" + err.message);
                return;
            }
            setMd(data);
        });
    }

    return (<>
    <div onDoubleClick={maximizeWindow} className="uk-padding uk-box-shadow-small uk-background-primary uk-light draggable uk-flex uk-flex-between uk-flex-middle">
        <h1 className="uk-logo uk-margin-remove">LazyServe</h1>
        <button className="uk-button uk-button-default" onClick={addProject}>Add</button>
    </div>
    <div className="uk-flex uk-flex-nowrap uk-flex-1" style={{overflow: "hidden"}}>
        <dl className="uk-description-list uk-description-list-divider uk-padding-small uk-height-1-1 uk-width-medium" style={{overflow: "scroll"}}>
            {
                projects.map((project: Project) => [
                <dt key={project.id + "t"} onClick={() => {selectProject(project.id)}} style={{cursor: "default"}}>{project.name}</dt>,
                <dd key={project.id + "d"} onClick={() => {selectProject(project.id)}} style={{cursor: "default"}}>{project.type} {PackageManager[project.pm]}</dd>])
            }
        </dl>
        <hr className="uk-divider-vertical uk-height-1-1 uk-margin-remove-vertical"/>
        <div className="uk-container uk-padding uk-flex-1" style={{overflow: "scroll"}}>
            {
                selected != null ? [
                <h1 className="uk-heading-divider" key="title">{projects[selected].name}</h1>,
                <div className="uk-button-group" key="buttons">
                    <button className="uk-button uk-button-primary" style={{backgroundColor: "#32CD32", color: "white"}}>Run</button>
                    <button className="uk-button uk-button-primary" style={{backgroundColor: "#1e87f0", color: "white"}}>Code</button>
                    <button className="uk-button uk-button-primary">Edit</button>
                    <button className="uk-button uk-button-danger" onClick={removeSelected}>Delete</button>
                </div>,
                <ReactMarkdown renderers={renderers} plugins={[gfm]} children={md} key="markdown"></ReactMarkdown>]
                :<></>
            }
        </div>
    </div>
    </>);
}

export default Root;