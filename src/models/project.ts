enum ProjectType  {
    Vue = "Vue.js",
    React = "React.js",
    Other = "Other"
}

enum PackageManager {
    NPM = <any>"npm",
    Yarn = <any>"yarn",
    Yarn2 = <any>"yarn2",
    Unset = <any>"unset"
}

export default interface Project {
    id: number;
    name: string;
    type: ProjectType;
    pm: PackageManager;
    path: string;
}

export {ProjectType, PackageManager};

