import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {remote} from "electron";
//@ts-ignore
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
//@ts-ignore
import {vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism";

const Root: React.FC = function() {
    const [maximized, setMaximized] = useState(false);

    const markdown = 
`# Trace PFE E-Squads Collector

Étudiant : David Ivain

___

## Table des Matières

[[_TOC_]]

___

## 1ère semaine

### Objectifs

Veille technologique, étudier les technologies multiplateformes afin de réduire le travail.

### Résultats

J'ai exploré plusieurs solutions possibles : React Native et kotlin. React Native est plus mature et est la solution retenue pour le moment.

J'ai recherché comment accéder à des fonctions natives de l'appareil sur react native ainsi que comment avoir un tray icon sur desktop. J'ai trouvé les modules natifs ainsi que qu'une solution pour electron pour le deuxième problème. React Native se confirme donc comme la solution la plus adaptée pour le moment.

### Sources

- [Créer un icône système avec electron](https://www.electronjs.org/docs/api/tray)
- [React Native native modules intro](https://reactnative.dev/docs/native-modules-intro)
- [React Native Electron](https://docs.expo.io/guides/using-electron/)

___

## 2ème semaine

### Objectifs

Continuer la veille technologique, créer des projets de tests pour tester les fonctionnalités et les essayer sur plusieurs plateformes.

### Résultats

#### **10/12/2020**
J'ai créé un projet de test avec expo-cli et l'ai essayé sur plusieurs émulateurs et sur le web.

![Une application de test tournant sur iOS, navigateur et electron](./assets/test_multiplatform.png)
![L'interface web d'expo](./assets/interface_expo.png)

#### **16/12/2020**
J'ai créé une base d'application cette fois avec react-native (anciennement react-native-cli) et ai créé un module natif pour iOS et Android en Objective-C et Java respectivement.

Code typescript commun :
\`\`\`ts
export const { DaemonModule } = ReactNative.NativeModules

export class DaemonModuleTS {
    static testPlatform = () => DaemonModule.testPlatform()
}
\`\`\`

Code du module Android :
\`\`\`java
public class DaemonModule extends ReactContextBaseJavaModule {
    DaemonModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "DaemonModule";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String testPlatform() {
        return "Android";
    }
}
\`\`\`

Header du module iOS:
\`\`\`objc
#import <React/RCTBridgeModule.h>
@interface RCTDaemonModule : NSObject <RCTBridgeModule>
@end
\`\`\`

Implementation du module iOS:
\`\`\`objc
#import "RCTDaemonModule.h"

@implementation RCTDaemonModule

RCT_EXPORT_MODULE();

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(testPlatform)
{
    return @"iOS";
}

@end
\`\`\`

Images du résultat:

| Android | iOS |
|:---:|:---:|
| ![Exécution sur Android](./assets/android_module_exec.png) | ![Exécution sur iOS](assets/ios_module_exec.png) |

### Sources

- [Doc React Native](https://reactnative.dev/docs/getting-started)
- [Doc React Native Navigation](https://reactnavigation.org/docs/getting-started/)
- [Créer une application React Native](https://reactnative.dev/docs/environment-setup)
- [React Native Electron](https://docs.expo.io/guides/using-electron/)
- [Créer un module natif Android](https://reactnative.dev/docs/native-modules-android)
- [Créer un module natif iOS](https://reactnative.dev/docs/native-modules-ios)

## 3ème et 4ème semaines

J'ai choisi d'explorer l'option proposée par flutter. J'ai donc créé une une application basique sur ce framework pour comparer le workflow par rapport à React Native. J'ai pû observer une meilleur stabilité et les bibliothèques de composants de bases facilitent la création d'applications avec un visuel commun.

Voici un screenshot de l'application.

![Application flutter sur iOS](assets/ios_flutter.png)

Sur un autre sujet, j'ai proposé de renforcer la sécurité de l'api en demandant à l'utilisateur le token d'un de ses appareils en plus du token utilisateur. Cependant, cette mesure ne serait utile que si le token d'un appareil est nécessaire pour accéder aux données de ce même appareil.

## 7ème semaine

Cette fois-ci, c'est sur Kotlin Multiplatform que je suis retourné. Étant donné que Kotlin est un langage officiellement supporté par android, j'ai voulu vérifier si les bindings de kotlin permettaient de s'abonner aux évènements hardware nécessaires sans écrire de code natif.

Si les bindings nécessaires sont bien présents, la gestion des types est assez compliquée.

## 8ème semaine

Rédaction du comparatif

## 9ème semaine

Correction du comparatif et début du développement de l'application mobile.`;
    
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

    return (<>
    <div onDoubleClick={maximizeWindow} className="uk-padding uk-box-shadow-small uk-background-primary uk-light draggable uk-panel">
        <h1 className="uk-logo">LazyServe</h1>
    </div>
    <div className="uk-flex uk-flex-nowrap uk-flex-1" style={{overflow: "hidden"}}>
        <dl className="uk-description-list uk-description-list-divider uk-padding-small uk-height-1-1 uk-width-medium" style={{overflow: "scroll"}}>
            <dt>Project 1</dt>
            <dd>blablabla</dd>
            <dt>Project 2</dt>
            <dd>blablbablbla</dd>
            <dt>Project 1</dt>
            <dd>blablabla</dd>
            <dt>Project 2</dt>
            <dd>blablbablbla</dd>
            <dt>Project 1</dt>
            <dd>blablabla</dd>
            <dt>Project 2</dt>
            <dd>blablbablbla</dd>
            <dt>Project 1</dt>
            <dd>blablabla</dd>
            <dt>Project 2</dt>
            <dd>blablbablbla</dd>
        </dl>
        <hr className="uk-divider-vertical uk-height-1-1 uk-margin-remove-vertical"/>
        <div className="uk-container uk-padding uk-flex-1" style={{overflow: "scroll"}}>
            <h1 className="uk-heading-divider">Hello</h1>
            <ReactMarkdown renderers={renderers} plugins={[gfm]} children={markdown}></ReactMarkdown>
        </div>
    </div>
    </>);
}

export default Root;