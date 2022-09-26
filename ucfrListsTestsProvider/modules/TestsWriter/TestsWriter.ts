import fs from 'fs';
import { IFileStructure, IFolderStructure, ITestsFolder } from '../../types/TestsFolder';

export class TestsWriter {
    constructor() {}
    public checkAndCreateAllMissingFolders({
        depthLimit: depthLimitReceived,
        currentDepth: currentDepthReceived,
        currentPath: currentPathReceived,
        currentFolder: currentFolderReceived,
    }:{
        depthLimit: number, currentDepth: number,
        currentPath: string, currentFolder: IFolderStructure
    }) {
        this.ensureDepthLimit({ depthLimit: depthLimitReceived, currentDepth: currentDepthReceived })

        if (currentFolderReceived.subFolders) {
            currentFolderReceived.subFolders.forEach(subFolder => {
                const pathToSubFolder = `${currentPathReceived}/${subFolder.name}`
                if (!fs.existsSync(pathToSubFolder)) {
                    fs.mkdirSync(pathToSubFolder)
                    console.log(
                        `\x1b[32m%s\x1b[0m`,
                        `created folder ${pathToSubFolder}`
                    );
                }
                this.checkAndCreateAllMissingFolders({
                    depthLimit: depthLimitReceived,
                    currentDepth: currentDepthReceived + 1,
                    currentPath: pathToSubFolder,
                    currentFolder: subFolder
                })
            })
        }
    }

    public checkAndCreateMissingFilesForAllFoldersAndSubFolders( {
        depthLimit: depthLimitReceived, currentDepth: currentDepthReceived, 
        currentPath: currentPathReceived, currentFolder: currentFolderReceived,
        markStringToIdentifyLabel: markStringToIdentifyLabelReceived,
        updatedLabelToControlFileInfo: updatedLabelToControlFileInfoReceived,
        contentForEmptyFile: contentForEmptyFileReceived,
    } : {
        depthLimit: number, currentDepth: number, 
        currentPath: string, currentFolder: IFolderStructure,
        markStringToIdentifyLabel: string,
        updatedLabelToControlFileInfo: string,
        contentForEmptyFile: string,
    }) {


        this.ensureDepthLimit({ depthLimit: depthLimitReceived, currentDepth: currentDepthReceived })

        const thisFolderHaveFiles = currentFolderReceived.files
        if (thisFolderHaveFiles) {
            currentFolderReceived.files?.forEach(file => {
                const pathToFile = `${currentPathReceived}/${file.name}`
                if (!fs.existsSync(pathToFile)) {
                    fs.writeFileSync(pathToFile, contentForEmptyFileReceived)
                    console.log(
                        '\x1b[34m%s\x1b[0m',
                        `created file ${pathToFile}`
                    );
                }
            })
        }

        const thisFolderHaveSubFolders = currentFolderReceived.subFolders
        if (thisFolderHaveSubFolders) {
            currentFolderReceived.subFolders?.forEach(subFolder => {
                const pathToSubFolder = `${currentPathReceived}/${subFolder.name}`
                this.checkAndCreateMissingFilesForAllFoldersAndSubFolders({
                    depthLimit: depthLimitReceived, currentDepth: currentDepthReceived + 1,
                    currentPath: pathToSubFolder, currentFolder: subFolder,
                    markStringToIdentifyLabel: markStringToIdentifyLabelReceived,
                    updatedLabelToControlFileInfo: updatedLabelToControlFileInfoReceived,
                    contentForEmptyFile: contentForEmptyFileReceived,
                })
            })
        }
    }

    public enterFilesToCheckAndWriteControlledLines({
        depthLimit: depthLimitReceived, currentDepth: currentDepthReceived,
        currentPath: currentPathReceived, currentFolder: currentFolderReceived,
        markStringToIdentifyLabel: markStringToIdentifyLabelReceived,
        oldLabelToControlFileInfo: oldLabelToControlFileInfoReceived,
        updatedLabelToControlFileInfo: updatedLabelToControlFileInfoReceived,
        parsedTestsSpecification: parsedTestsSpecificationReceived,
    } : {
        depthLimit: number, currentDepth: number, 
        currentPath: string, currentFolder: IFolderStructure,
        markStringToIdentifyLabel: string,
        oldLabelToControlFileInfo: string,
        updatedLabelToControlFileInfo: string,
        parsedTestsSpecification: ITestsFolder,
    }) {

        this.ensureDepthLimit({ depthLimit: depthLimitReceived, currentDepth: currentDepthReceived })

        this.recursiveCallForAllSubFoldersEnterFilesToCheckAndWriteControlledLines({
            depthLimit: depthLimitReceived, currentDepth: currentDepthReceived,
            currentPath: currentPathReceived, currentFolder: currentFolderReceived,
            markStringToIdentifyLabel: markStringToIdentifyLabelReceived,
            oldLabelToControlFileInfo: oldLabelToControlFileInfoReceived,
            updatedLabelToControlFileInfo: updatedLabelToControlFileInfoReceived,
            parsedTestsSpecification: parsedTestsSpecificationReceived,
        })



        if (currentFolderReceived.files) {
            currentFolderReceived.files.forEach(scopedFile => {
                const pathToFile = `${currentPathReceived}/${scopedFile.name}`
                const fileContent = fs.readFileSync(pathToFile, 'utf8')
                const fileContentWithUpdatedLabel = fileContent.replace(
                    `${markStringToIdentifyLabelReceived}${oldLabelToControlFileInfoReceived}${markStringToIdentifyLabelReceived}`,
                    `${markStringToIdentifyLabelReceived}${updatedLabelToControlFileInfoReceived}${markStringToIdentifyLabelReceived}`
                )

                switch (scopedFile.type) {
                    case 'useCase': {
                        const fullContent = this.executeLogicForControllingUseCaseFile({file: scopedFile, fileContent: fileContentWithUpdatedLabel})
                        fs.writeFileSync(pathToFile, fullContent)
                        break;
                    }
                    case 'nestedUseCase': {
                        const fullContent = this.executeLogicForControllingNestedUseCaseFile({file: scopedFile, fileContent: fileContentWithUpdatedLabel})
                        fs.writeFileSync(pathToFile, fullContent)
                        break
                    }
                    case 'functionalRequirement': {
                        const fullContent = this.executeLogicForControllingFunctionalRequirementFile({file: scopedFile, fileContent: fileContentWithUpdatedLabel})
                        fs.writeFileSync(pathToFile, fullContent)
                        break
                    }
                    default:
                        throw new Error("something went wrong and file type was not recognized")
                }
            })
        }
    }


    private ensureDepthLimit({ depthLimit: depthLimitReceived, currentDepth: currentDepthReceived } : { depthLimit: number, currentDepth: number }) {
        const depthLimitReached = currentDepthReceived === depthLimitReceived
        if (depthLimitReached) {
            console.log('depth limit reached')
            throw new Error("something went wrong and depth limit was reached")
        }
    }

    private recursiveCallForAllSubFoldersEnterFilesToCheckAndWriteControlledLines({
        depthLimit: depthLimitReceived, currentDepth: currentDepthReceived,
        currentPath: currentPathReceived, currentFolder: currentFolderReceived,
        markStringToIdentifyLabel: markStringToIdentifyLabelReceived,
        oldLabelToControlFileInfo: oldLabelToControlFileInfoReceived,
        updatedLabelToControlFileInfo: updatedLabelToControlFileInfoReceived,
        parsedTestsSpecification: parsedTestsSpecificationReceived,
    } : {
        depthLimit: number, currentDepth: number,
        currentPath: string, currentFolder: IFolderStructure,
        markStringToIdentifyLabel: string,
        oldLabelToControlFileInfo: string,
        updatedLabelToControlFileInfo: string,
        parsedTestsSpecification: ITestsFolder,
    }) {
        const thisFolderHaveSubFolders = currentFolderReceived.subFolders
        if (thisFolderHaveSubFolders) {
            currentFolderReceived.subFolders?.forEach(subFolder => {
                const pathToSubFolder = `${currentPathReceived}/${subFolder.name}`
                this.enterFilesToCheckAndWriteControlledLines({
                    depthLimit: depthLimitReceived, currentDepth: currentDepthReceived + 1,
                    currentPath: pathToSubFolder, currentFolder: subFolder,
                    markStringToIdentifyLabel: markStringToIdentifyLabelReceived,
                    oldLabelToControlFileInfo: oldLabelToControlFileInfoReceived,
                    updatedLabelToControlFileInfo: updatedLabelToControlFileInfoReceived,
                    parsedTestsSpecification: parsedTestsSpecificationReceived,
                })
            })
        }
    }


    private executeLogicForControllingUseCaseFile({
        file: fileReceived, fileContent: fileContentReceived
    } : {file: IFileStructure, fileContent: string}) {
        return ''
    }

    private executeLogicForControllingNestedUseCaseFile({
        file: fileReceived, fileContent: fileContentReceived
    } : {file: IFileStructure, fileContent: string}) {
        return ''
    }

    private executeLogicForControllingFunctionalRequirementFile({ 
        file: fileReceived, fileContent: fileContentReceived
    } : {file: IFileStructure, fileContent: string}) {
        return ''
    }
}