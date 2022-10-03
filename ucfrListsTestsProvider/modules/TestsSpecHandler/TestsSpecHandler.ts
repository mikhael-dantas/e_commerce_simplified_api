import { IFunctionalRequirementFolder, IFunctionalRequirementModuleFolder, INestedUseCaseFolder, ITestsFolder, IUseCaseFolder, IUseCasesModuleFolder } from "../../types/TestsFolder";
import { IUcfrLists } from "../../types/ucfrLists";

export default class TestsSpecHandler {

    public static parseAndValidateFromJSON(json: string): ITestsFolder {
        const parsedObject = JSON.parse(json);

        const ucfrLists: IUcfrLists = {
            tags: [...parsedObject.tags],
            modules: [...parsedObject.modules]
        }
        this.checkIfParsedObjectIsValid(ucfrLists)

        const spec = this.transformObjectIntoTestsSpec(ucfrLists)
        return spec;
    }

    private static checkIfParsedObjectIsValid(ucfrLists: IUcfrLists): boolean {
        ucfrLists.tags.forEach(tagScoped => {
            if (!tagScoped.id) {
                throw new Error(`The tag ${tagScoped.name} does not have an id`)
            }
            if (!tagScoped.name) {
                throw new Error(`The tag ${tagScoped.name} does not have a name`)
            }
            if (!tagScoped.description) {
                throw new Error(`The tag ${tagScoped.name} does not have a description`)
            }
        })

        ucfrLists.modules.forEach(moduleScoped => {
            if (!moduleScoped.id) {
                throw new Error(`The module ${moduleScoped.name} does not have an id`)
            }
            if (!moduleScoped.name) {
                throw new Error(`The module ${moduleScoped.name} does not have a name`)
            }
            if (!moduleScoped.functionalRequirements) {
                throw new Error(`The module ${moduleScoped.name} does not have functionalRequirements`)
            }
            if (!moduleScoped.useCases) {
                throw new Error(`The module ${moduleScoped.name} does not have useCases`)
            }
            if (!moduleScoped.nestedUseCases) {
                throw new Error(`The module ${moduleScoped.name} does not have nestedUseCases`)
            }
            moduleScoped.functionalRequirements.forEach(frScoped => {
                if (!frScoped.id) {
                    throw new Error(`The fr ${frScoped.name} does not have an id`)
                }
                if (!frScoped.name) {
                    throw new Error(`The fr ${frScoped.name} does not have a name`)
                }
                if (!frScoped.moduleId) {
                    throw new Error(`The fr ${frScoped.name} does not have a moduleId`)
                }
                if (!frScoped.tagIds) {
                    throw new Error(`The fr ${frScoped.name} does not have tagIds`)
                }
                if (!frScoped.done) {
                    throw new Error(`The fr ${frScoped.name} does not have a done`)
                }
                if (!frScoped.frDependencies) {
                    throw new Error(`The fr ${frScoped.name} does not have frDependencies`)
                }
            })
            moduleScoped.useCases.forEach(useCaseScoped => {
                if (!useCaseScoped.id) {
                    throw new Error(`The useCase ${useCaseScoped.name} does not have an id`)
                }
                if (!useCaseScoped.name) {
                    throw new Error(`The useCase ${useCaseScoped.name} does not have a name`)
                }
                if (!useCaseScoped.moduleId) {
                    throw new Error(`The useCase ${useCaseScoped.name} does not have a moduleId`)
                }
                if (!useCaseScoped.tagIds) {
                    throw new Error(`The useCase ${useCaseScoped.name} does not have tagIds`)
                }
                if (!useCaseScoped.completed) {
                    throw new Error(`The useCase ${useCaseScoped.name} does not have a completed`)
                }
                if (!useCaseScoped.neededFrsToWorkIds) {
                    throw new Error(`The useCase ${useCaseScoped.name} does not have neededFrsToWorkIds`)
                }
                if (!useCaseScoped.useCasesPipelineIds) {
                    throw new Error(`The useCase ${useCaseScoped.name} does not have useCasesPipelineIds`)
                }
            })
            moduleScoped.nestedUseCases.forEach(nestedUseCaseScoped => {
                if (!nestedUseCaseScoped.id) {
                    throw new Error(`The nestedUseCase ${nestedUseCaseScoped.name} does not have an id`)
                }
                if (!nestedUseCaseScoped.name) {
                    throw new Error(`The nestedUseCase ${nestedUseCaseScoped.name} does not have a name`)
                }
                if (!nestedUseCaseScoped.moduleId) {
                    throw new Error(`The nestedUseCase ${nestedUseCaseScoped.name} does not have a moduleId`)
                }
                if (!nestedUseCaseScoped.tagIds) {
                    throw new Error(`The nestedUseCase ${nestedUseCaseScoped.name} does not have tagIds`)
                }
                if (!nestedUseCaseScoped.completed) {
                    throw new Error(`The nestedUseCase ${nestedUseCaseScoped.name} does not have a completed`)
                }
                if (!nestedUseCaseScoped.neededFrsToWorkIds) {
                    throw new Error(`The nestedUseCase ${nestedUseCaseScoped.name} does not have neededFrsToWorkIds`)
                }
                if (!nestedUseCaseScoped.parentUseCaseId) {
                    throw new Error(`The nestedUseCase ${nestedUseCaseScoped.name} does not have parentUseCaseId`)
                }
                if (!nestedUseCaseScoped.useCasesPipelineIds) {
                    throw new Error(`The nestedUseCase ${nestedUseCaseScoped.name} does not have useCasesPipelineIds`)
                }
            })
        })
        return true;
    }

    private static transformObjectIntoTestsSpec(ucfrLists: IUcfrLists): ITestsFolder {
        const testsFolder: ITestsFolder = {
            name: 'root',
            files: null,
            subFolders: []
        }

        const integrationTestsFolder: {
            name: 'integration',
            files: null,
            subFolders: IUseCasesModuleFolder[]
        } = {
            name: 'integration',
            files: null,
            subFolders: []
        }

        const unitTestsFolder: {
            name: 'unit',
            files: null,
            subFolders: IFunctionalRequirementModuleFolder[]
        } = {
            name: 'unit',
            files: null,
            subFolders: []
        }



        ucfrLists.modules.forEach(moduleScoped => {
            // const moduleIdScoped = moduleScoped.id;
            const moduleNameScoped = moduleScoped.name;
            const moduleUseCasesScoped = moduleScoped.useCases;
            const moduleNestedUseCasesScoped = moduleScoped.nestedUseCases;
            const moduleFunctionalRequirementsScoped = moduleScoped.functionalRequirements;


            moduleUseCasesScoped.forEach(useCaseScoped => {
                const useCaseIdScoped = useCaseScoped.id;
                // const useCaseNameScoped = useCaseScoped.name;
                // const useCaseTagIdsScoped = useCaseScoped.tagIds;
                // const useCaseModuleIdScoped = useCaseScoped.moduleId;
                const useCaseCompletedScoped = useCaseScoped.completed;
                // const useCaseNeededFrsToWorkIdsScoped = useCaseScoped.neededFrsToWorkIds;
                // const useCaseUseCasesPipelineIdsScoped = useCaseScoped.useCasesPipelineIds;


                // check if the useCase is completed
                if (!useCaseCompletedScoped) { return }

                // check if the category exists and create it if not
                if (!(integrationTestsFolder.subFolders.find(categoryFolderScoped => categoryFolderScoped.name === moduleNameScoped))) {
                    integrationTestsFolder.subFolders.push({
                        name: moduleNameScoped,
                        files: null,
                        subFolders: []
                    })
                }

                // create the useCase folder and files
                const useCaseFolder: IUseCaseFolder = {
                    name: useCaseIdScoped,
                    subFolders: [{
                        name: 'nestedUseCases',
                        files: [{
                            name: 'nestedUseCases.test.ts',
                            type: 'nestedUseCase',
                            content: []
                        }],
                        subFolders: null,
                    }],
                    files: [{
                        name: 'index.test.ts',
                        type: 'useCase',
                        content: useCaseScoped
                    }]
                }

                const newIntegrationTestsFolderState = integrationTestsFolder.subFolders.map(categoryFolderScoped => {
                    if (categoryFolderScoped.name === moduleNameScoped) {
                        return {
                            ...categoryFolderScoped,
                            subFolders: [...categoryFolderScoped.subFolders, useCaseFolder]
                        }
                    }
                    return categoryFolderScoped;
                })

                integrationTestsFolder.subFolders = newIntegrationTestsFolderState;
            })


            moduleNestedUseCasesScoped.forEach(nestedUseCaseScoped => {
                const nestedUseCaseIdScoped = nestedUseCaseScoped.id;
                const nestedUseCaseParentUseCaseIdScoped = nestedUseCaseScoped.parentUseCaseId;
                // const nestedUseCaseNameScoped = nestedUseCaseScoped.name;
                // const nestedUseCaseTagIdsScoped = nestedUseCaseScoped.tagIds;
                // const nestedUseCaseModuleIdScoped = nestedUseCaseScoped.moduleId;
                const nestedUseCaseCompletedScoped = nestedUseCaseScoped.completed;
                // const nestedUseCaseNeededFrsToWorkIdsScoped = nestedUseCaseScoped.neededFrsToWorkIds;
                // const nestedUseCaseUseCasesPipelineIdsScoped = nestedUseCaseScoped.useCasesPipelineIds;


                // check if the test should be made
                if (!nestedUseCaseCompletedScoped) {
                    return
                }

                // check if the parent useCase exists
                const categoryFolder = integrationTestsFolder.subFolders.find(categoryFolderScoped => categoryFolderScoped.name === moduleNameScoped)
                if (!categoryFolder) { throw new Error(
                    `The category folder ${moduleNameScoped} does not exist\n` + `NestedUseCase: ${nestedUseCaseIdScoped}`
                ) }

                const useCaseFolder = categoryFolder.subFolders.find(useCaseFolderScoped => useCaseFolderScoped.name === nestedUseCaseParentUseCaseIdScoped);
                if (!useCaseFolder) { throw new Error(
                    `The useCase folder ${nestedUseCaseParentUseCaseIdScoped} does not exist\n` + `NestedUseCase: ${nestedUseCaseIdScoped}`
                ) }

                // insert the nestedUseCase
                const newIntegrationTestsFolderState = integrationTestsFolder.subFolders.map(categoryFolderScoped => {
                    if (categoryFolderScoped.name === moduleNameScoped) {
                        return {
                            ...categoryFolderScoped,
                            subFolders: categoryFolderScoped.subFolders.map(useCaseFolderScoped => {
                                if (useCaseFolderScoped.name === nestedUseCaseParentUseCaseIdScoped) {
                                    const newNestedUseCaseFolder: INestedUseCaseFolder = {
                                        name: "nestedUseCases",
                                        files: [{
                                            name: "nestedUseCases.test.ts",
                                            type: 'nestedUseCase',
                                            content: [
                                                ...useCaseFolderScoped.subFolders[0].files[0].content,
                                                nestedUseCaseScoped
                                            ]
                                        }],
                                        subFolders: null
                                    }
                                    return {
                                        ...useCaseFolderScoped,
                                        subFolders: [newNestedUseCaseFolder]
                                    }
                                }
                                return useCaseFolderScoped;
                            })
                        }
                    }
                    return categoryFolderScoped;
                })

                integrationTestsFolder.subFolders = newIntegrationTestsFolderState;
            })


            moduleFunctionalRequirementsScoped.forEach(frScoped => {
                const frIdScoped = frScoped.id;
                // const frNameScoped = frScoped.name;
                // const frTagIdsScoped = frScoped.tagIds;
                // const frModuleIdScoped = frScoped.moduleId;
                // const frDoneScoped = frScoped.done;
                // const frDependenciesScoped = frScoped.frDependencies;


                // check if the fr is done
                if (!frScoped.done) { return }

                // check if the category exists and create it if not
                if (!(unitTestsFolder.subFolders.find(categoryFolderScoped => categoryFolderScoped.name === moduleNameScoped))) {
                    unitTestsFolder.subFolders.push({
                        name: moduleNameScoped,
                        files: null,
                        subFolders: []
                    })
                }

                // create the fr folder and files
                const frFolder: IFunctionalRequirementFolder = {
                    name: frIdScoped,
                    subFolders: null,
                    files: [{
                        name: 'index.test.ts',
                        type: 'functionalRequirement',
                        content: frScoped
                    }]
                }

                const newUnitTestsFolderState = unitTestsFolder.subFolders.map(categoryFolderScoped => {
                    if (categoryFolderScoped.name === moduleNameScoped) {
                        return {
                            ...categoryFolderScoped,
                            subFolders: [...categoryFolderScoped.subFolders, frFolder]
                        }
                    }
                    return categoryFolderScoped;
                })

                unitTestsFolder.subFolders = newUnitTestsFolderState;
            })


        })

        testsFolder.subFolders.push(integrationTestsFolder);
        testsFolder.subFolders.push(unitTestsFolder);

        return testsFolder;
    }
}