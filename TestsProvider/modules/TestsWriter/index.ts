import fs from 'fs';
import { AskQuestion } from '../../lib/AskQuestion';
import { IFileStructure, IFolderStructure, ITestsFolder } from '../../types/TestsFolder';
import { IFunctionalRequirement, INestedUseCase, IUseCase } from '../../types/ucfrLists';

export class TestsWriter {
    public static checkAndCreateAllMissingFolders({
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

    public static checkAndCreateMissingFilesForAllFoldersAndSubFolders( {
        depthLimit: depthLimitReceived, currentDepth: currentDepthReceived, 
        currentPath: currentPathReceived, currentFolder: currentFolderReceived,
        updatedLabelToControlFileInfo: updatedLabelToControlFileInfoReceived,
        contentForEmptyFile: contentForEmptyFileReceived,
    } : {
        depthLimit: number, currentDepth: number, 
        currentPath: string, currentFolder: IFolderStructure,
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
                    updatedLabelToControlFileInfo: updatedLabelToControlFileInfoReceived,
                    contentForEmptyFile: contentForEmptyFileReceived,
                })
            })
        }
    }

    public static enterFilesToCheckAndWriteControlledLines({
        depthLimit: depthLimitReceived, currentDepth: currentDepthReceived,
        currentPath: currentPathReceived, currentFolder: currentFolderReceived,
        oldLabelToControlFileInfo: oldLabelToControlFileInfoReceived,
        updatedLabelToControlFileInfo: updatedLabelToControlFileInfoReceived,
        parsedTestsSpecification: parsedTestsSpecificationReceived,
    } : {
        depthLimit: number, currentDepth: number, 
        currentPath: string, currentFolder: IFolderStructure,
        oldLabelToControlFileInfo: string,
        updatedLabelToControlFileInfo: string,
        parsedTestsSpecification: ITestsFolder,
    }) {

        this.ensureDepthLimit({ depthLimit: depthLimitReceived, currentDepth: currentDepthReceived })

        this.recursiveCallForAllSubFoldersEnterFilesToCheckAndWriteControlledLines({
            depthLimit: depthLimitReceived, currentDepth: currentDepthReceived,
            currentPath: currentPathReceived, currentFolder: currentFolderReceived,
            oldLabelToControlFileInfo: oldLabelToControlFileInfoReceived,
            updatedLabelToControlFileInfo: updatedLabelToControlFileInfoReceived,
            parsedTestsSpecification: parsedTestsSpecificationReceived,
        })



        if (currentFolderReceived.files) {
            currentFolderReceived.files.forEach(scopedFile => {
                const pathToFile = `${currentPathReceived}/${scopedFile.name}`
                const fileContent = fs.readFileSync(pathToFile, 'utf8')

                switch (scopedFile.type) {
                    case 'useCase': {
                        const fullContent = this.executeLogicForControllingUseCaseFile({file: scopedFile, fileContent: fileContent, label: updatedLabelToControlFileInfoReceived})
                        if (!fullContent) { return }
                        fs.writeFileSync(pathToFile, fullContent)
                        break;
                    }
                    case 'nestedUseCase': {
                        const fullContent = this.executeLogicForControllingNestedUseCaseFile({file: scopedFile, fileContent: fileContent, label: updatedLabelToControlFileInfoReceived})
                        fs.writeFileSync(pathToFile, fullContent)
                        break
                    }
                    case 'functionalRequirement': {
                        const fullContent = this.executeLogicForControllingFunctionalRequirementFile({file: scopedFile, fileContent: fileContent, label: updatedLabelToControlFileInfoReceived})
                        if (!fullContent) { return }
                        fs.writeFileSync(pathToFile, fullContent)
                        break
                    }
                    default:
                        throw new Error("something went wrong and file type was not recognized")
                }
            })
        }
    }


    private static ensureDepthLimit({ depthLimit: depthLimitReceived, currentDepth: currentDepthReceived } : { depthLimit: number, currentDepth: number }) {
        const depthLimitReached = currentDepthReceived === depthLimitReceived
        if (depthLimitReached) {
            console.log('depth limit reached')
            throw new Error("something went wrong and depth limit was reached")
        }
    }

    private static recursiveCallForAllSubFoldersEnterFilesToCheckAndWriteControlledLines({
        depthLimit: depthLimitReceived, currentDepth: currentDepthReceived,
        currentPath: currentPathReceived, currentFolder: currentFolderReceived,
        oldLabelToControlFileInfo: oldLabelToControlFileInfoReceived,
        updatedLabelToControlFileInfo: updatedLabelToControlFileInfoReceived,
        parsedTestsSpecification: parsedTestsSpecificationReceived,
    } : {
        depthLimit: number, currentDepth: number,
        currentPath: string, currentFolder: IFolderStructure,
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
                    oldLabelToControlFileInfo: oldLabelToControlFileInfoReceived,
                    updatedLabelToControlFileInfo: updatedLabelToControlFileInfoReceived,
                    parsedTestsSpecification: parsedTestsSpecificationReceived,
                })
            })
        }
    }

    private static putFailCodeInFragment(fragment: string) {
        const failCode = `\n// this code fail was put in here because this test name was eddited\n;expect(true).toBe(false);`
        const fragmentArray = fragment.split('}')
        const lastFragmentArrayElement = fragmentArray[fragmentArray.length - 2]
        const fragmentArrayWithoutLastElement = fragmentArray.slice(0, fragmentArray.length - 2)
        const newFragmentArray = [...fragmentArrayWithoutLastElement, lastFragmentArrayElement + failCode, ""]
        return newFragmentArray.join('}')
    }

    private static executeLogicForControllingUseCaseFile({
        file: fileReceived, fileContent: fileContentReceived, label: labelReceived
    } : {
        file: IFileStructure, fileContent: string, label: string
    }): string | undefined {
        const useCase: IUseCase = fileReceived.content as IUseCase
        const startTestPositionMark = `// ${useCase.id}`
        const endTestPositionMark = `// ${useCase.id}`
        const compareStringTestPositionMark = `// positionLabel1-${useCase.name}-positionLabel2`
        const labelStringTestPositionMark = `// positionLabel3-${labelReceived}-positionLabel4`
        const testNameStartPositionMark = `// positionLabel5`
        const testNameEndPositionMark = `// positionLabel6`
        const testCodeStartPositionMark = `// positionLabel7`
        const testCodeEndPositionMark = `// positionLabel8`

        const newTestCode = `\n() => {expect(true).toBe(false)}\n)` 

        const newTestStringMaker = (testCode: string) => {
            const stringToReturn = `\n${startTestPositionMark}`
            + `\n${testNameStartPositionMark}`
            + `\ntest(\n'${useCase.name}',`
            + `\n${testNameEndPositionMark}`
            + `\n${testCodeStartPositionMark}`
            + `\n${testCode}`
            + `\n${testCodeEndPositionMark}`
            + `\n${compareStringTestPositionMark}`
            + `\n${endTestPositionMark}`
            + `\n${labelStringTestPositionMark}`
            return stringToReturn
        }

        const thisTestIsAlreadyWritten = fileContentReceived.match(new RegExp(startTestPositionMark, 'g'))

        if (!thisTestIsAlreadyWritten) {
            console.log('no use case test found, writing new test')
            return newTestStringMaker(newTestCode)
        }

        if (thisTestIsAlreadyWritten) {
            const thisTestFragment = fileContentReceived.match(new RegExp(`${startTestPositionMark}.*${endTestPositionMark}`, 's'))?.[0]
            if (!thisTestFragment) {
                throw new Error(`something went wrong and thisTestFragment was not found for use case id & name: ${useCase.id} & ${useCase.name}`)
            }

            const thisTestFragmentMatchComparisonString = thisTestFragment.match(new RegExp(compareStringTestPositionMark, 'g'))
            if (!thisTestFragmentMatchComparisonString) {
                console.log('no matching in this use case test, writing new test')
                const fragmentCode = thisTestFragment.match(new RegExp(`${testCodeStartPositionMark}.*${testCodeEndPositionMark}`, 's'))?.[0]
                if (!fragmentCode) {
                    throw new Error(`something went wrong and fragmentCode was not found for use case id & name: ${useCase.id} & ${useCase.name}`)
                }
                const fragmentWihtoutPositionMarks = fragmentCode.replace(new RegExp(`${testCodeStartPositionMark}`, 'g'), '').replace(new RegExp(`${testCodeEndPositionMark}`, 'g'), '')
                
                const codeMarkedWithFail = this.putFailCodeInFragment(fragmentWihtoutPositionMarks)
                return newTestStringMaker(codeMarkedWithFail)
            }

            if (thisTestFragmentMatchComparisonString) {
                console.log('writing nothing, test already written')
                return undefined
            }

            throw new Error(`something went wrong and thisTestFragment was not found for use case id & name: ${useCase.id} & ${useCase.name}`)
        }

        throw new Error(`something went wrong and thisTestFragment was not found for use case id & name: ${useCase.id} & ${useCase.name}`)
    }

    private static executeLogicForControllingNestedUseCaseFile({
        file: fileReceived, fileContent: fileContentReceived, label: labelReceived
    } : {
        file: IFileStructure, fileContent: string, label: string
    }) {
        const nestedUseCases: INestedUseCase[] = fileReceived.content as INestedUseCase[]

        let accumulatedNewTestsWrittenString = ''

        if (nestedUseCases.length === 0) {
            return 'test("no nested use cases", () => {expect(true).toBe(true)})'
        }
        nestedUseCases.forEach(nestedUseCase => {
            const startTestPositionMark = `// ${nestedUseCase.id}`
            const endTestPositionMark = `// ${nestedUseCase.id}`
            const compareStringTestPositionMark = `// positionLabel1-${nestedUseCase.name}-positionLabel2`
            const labelStringTestPositionMark = `// positionLabel3-${labelReceived}-positionLabel4`
            const testNameStartPositionMark = `// positionLabel5`
            const testNameEndPositionMark = `// positionLabel6`
            const testCodeStartPositionMark = `// positionLabel7`
            const testCodeEndPositionMark = `// positionLabel8`


            const newTestCode = `\n() => {expect(true).toBe(false)}\n)` 

            const newTestStringMaker = (testCode: string) => {
                const stringToReturn = `\n${startTestPositionMark}`
                + `\n${testNameStartPositionMark}`
                + `\ntest(\n'${nestedUseCase.name}',`
                + `\n${testNameEndPositionMark}`
                + `\n${testCodeStartPositionMark}`
                + `\n${testCode}`
                + `\n${testCodeEndPositionMark}`
                + `\n${compareStringTestPositionMark}`
                + `\n${endTestPositionMark}`
                + `\n${labelStringTestPositionMark}`
                return stringToReturn
            }

            const thisTestIsAlreadyWritten = fileContentReceived.match(new RegExp(startTestPositionMark, 'g'))

            if (!thisTestIsAlreadyWritten) {
                console.log('no nested use case test found, writing new test')
                accumulatedNewTestsWrittenString += newTestStringMaker(newTestCode)
                return
            }

            if (thisTestIsAlreadyWritten) {
                const thisTestFragment = fileContentReceived.match(new RegExp(`${startTestPositionMark}.*${endTestPositionMark}`, 's'))?.[0]
                if (!thisTestFragment) {
                    throw new Error(`something went wrong and thisTestFragment was not found for nested use case id & name: ${nestedUseCase.id} & ${nestedUseCase.name}`)
                }

                const thisTestFragmentMatchComparisonString = thisTestFragment.match(new RegExp(compareStringTestPositionMark, 'g'))
                if (!thisTestFragmentMatchComparisonString) {
                    console.log('no matching in this nested use case test, writing new test')
                    const fragmentCode = thisTestFragment.match(new RegExp(`${testCodeStartPositionMark}.*${testCodeEndPositionMark}`, 's'))?.[0]
                    if (!fragmentCode) {
                        throw new Error(`something went wrong and fragmentCode was not found for nested use case id & name: ${nestedUseCase.id} & ${nestedUseCase.name}`)
                    }
                    const fragmentWihtoutPositionMarks = fragmentCode.replace(new RegExp(`${testCodeStartPositionMark}`, 'g'), '').replace(new RegExp(`${testCodeEndPositionMark}`, 'g'), '')
                    const codeMarkedWithFail = this.putFailCodeInFragment(fragmentWihtoutPositionMarks)
                    accumulatedNewTestsWrittenString += newTestStringMaker(codeMarkedWithFail)
                    return
                }

                if (thisTestFragmentMatchComparisonString) {
                    console.log('writing same nested use case test')
                    accumulatedNewTestsWrittenString += thisTestFragment
                    return
                }

                throw new Error(`something went wrong and thisTestFragment was not found for nested use case id & name: ${nestedUseCase.id} & ${nestedUseCase.name}`)
            }

            throw new Error(`something went wrong and thisTestFragment was not found for nested use case id & name: ${nestedUseCase.id} & ${nestedUseCase.name}`)
        })

        return accumulatedNewTestsWrittenString
    }

    private static executeLogicForControllingFunctionalRequirementFile({ 
        file: fileReceived, fileContent: fileContentReceived, label: labelReceived
    } : {
        file: IFileStructure, fileContent: string, label: string
    }): string | undefined {
        const fRequirement: IFunctionalRequirement = fileReceived.content as IFunctionalRequirement
        const startTestPositionMark = `// ${fRequirement.id}`
        const endTestPositionMark = `// ${fRequirement.id}`
        const compareStringTestPositionMark = `// positionLabel1-${fRequirement.name}-positionLabel2`
        const labelStringTestPositionMark = `// positionLabel3-${labelReceived}-positionLabel4`
        const testNameStartPositionMark = `// positionLabel5`
        const testNameEndPositionMark = `// positionLabel6`
        const testCodeStartPositionMark = `// positionLabel7`
        const testCodeEndPositionMark = `// positionLabel8`

        const newTestCode = `\n() => {expect(true).toBe(false)}\n)` 

        const newTestStringMaker = (testCode: string) => {
            
            const stringToReturn = `\n${startTestPositionMark}`
            + `\n${testNameStartPositionMark}`
            + `\ntest(\n'${fRequirement.name}',`
            + `\n${testNameEndPositionMark}`
            + `\n${testCodeStartPositionMark}`
            + `\n${testCode}`
            + `\n${testCodeEndPositionMark}`
            + `\n${compareStringTestPositionMark}`
            + `\n${endTestPositionMark}`
            + `\n${labelStringTestPositionMark}`
            return stringToReturn
        }

        const thisTestIsAlreadyWritten = fileContentReceived.match(new RegExp(startTestPositionMark, 'g'))

        if (!thisTestIsAlreadyWritten) {
            console.log('no fRequirement test found, writing new test')
            return newTestStringMaker(newTestCode)
        }

        if (thisTestIsAlreadyWritten) {
            const thisTestFragment = fileContentReceived.match(new RegExp(`${startTestPositionMark}.*${endTestPositionMark}`, 's'))?.[0]
            if (!thisTestFragment) {
                throw new Error(`something went wrong and thisTestFragment was not found for fRequirement id & name: ${fRequirement.id} & ${fRequirement.name}`)
            }

            const thisTestFragmentMatchComparisonString = thisTestFragment.match(new RegExp(compareStringTestPositionMark, 'g'))
            if (!thisTestFragmentMatchComparisonString) {
                console.log('no matching in this fRequirement test, writing new test')
                const fragmentCode = thisTestFragment.match(new RegExp(`${testCodeStartPositionMark}.*${testCodeEndPositionMark}`, 's'))?.[0]
                if (!fragmentCode) {
                    throw new Error(`something went wrong and fragmentCode was not found for fRequirement id & name: ${fRequirement.id} & ${fRequirement.name}`)
                }
                const fragmentWihtoutPositionMarks = fragmentCode.replace(new RegExp(`${testCodeStartPositionMark}`, 'g'), '').replace(new RegExp(`${testCodeEndPositionMark}`, 'g'), '')
                
                const codeMarkedWithFail = this.putFailCodeInFragment(fragmentWihtoutPositionMarks)
                return newTestStringMaker(codeMarkedWithFail)
            }

            if (thisTestFragmentMatchComparisonString) {
                console.log('writing nothing')
                return undefined
            }

            throw new Error(`something went wrong and this fRequirement was not controlled: ${fRequirement.id} & ${fRequirement.name}`)
        }

        throw new Error(`something went wrong and this fRequirement was not controlled: ${fRequirement.id} & ${fRequirement.name}`) 
    }

    public static async checkAndDeleteUnlistedFilesForAllFoldersAndSubFolders( {
        depthLimit: depthLimitReceived, currentDepth: currentDepthReceived, 
        currentPath: currentPathReceived, currentFolder: currentFolderReceived,
    } : {
        depthLimit: number, currentDepth: number, 
        currentPath: string, currentFolder: IFolderStructure,
    }) {


        this.ensureDepthLimit({ depthLimit: depthLimitReceived, currentDepth: currentDepthReceived })

        // check path subfolders and files, then delete unlisted ones
        const currentPathSubFolders = fs.readdirSync(currentPathReceived, { withFileTypes: true }).filter(dirent => dirent.isDirectory())
        const currentPathSubFiles = fs.readdirSync(currentPathReceived, { withFileTypes: true }).filter(dirent => dirent.isFile())

        const currentFolderSubFolders = currentFolderReceived.subFolders
        const currentFolderFiles = currentFolderReceived.files

        for (const subFolder of currentPathSubFolders) {
            const subFolderName = subFolder.name
            const subFolderPath = `${currentPathReceived}/${subFolderName}`
            if (currentFolderSubFolders === null ) {
                // delete all currentPathSubFolders
                const answer = await AskQuestion(`delete folder ${subFolderPath} ?  y/n`)
                if (answer.toLowerCase().trim() === 'y') {
                    fs.rmSync(subFolderPath, { recursive: true })
                    console.log(
                        // log in red
                        `\x1b[31m%s\x1b[0m`,
                        `folder ${subFolderPath} deleted`
                    )
                }
                continue
            }
            const subFolderStructure = currentFolderSubFolders.find((subFolderStructure) => subFolderStructure.name === subFolderName)
            if (!subFolderStructure) {
                // delete this subFolder
                const answer = await AskQuestion(`delete folder ${subFolderPath} ?  y/n`)
                if (answer.toLowerCase().trim() === 'y') {
                    fs.rmSync(subFolderPath, { recursive: true })
                    console.log(
                        // log in red
                        `\x1b[31m%s\x1b[0m`,
                        `folder ${subFolderPath} deleted`
                    )
                }
                continue
            }
        }

        for (const subFile of currentPathSubFiles) {
            const subFileName = subFile.name
            const subFilePath = `${currentPathReceived}/${subFileName}`
            if (currentFolderFiles === null ) {
                // delete all currentPathFiles
                const answer = await AskQuestion(`delete file ${subFilePath} ?  y/n`)
                if (answer.toLowerCase().trim() === 'y') {
                    fs.unlinkSync(subFilePath)
                    console.log(
                        // log in red
                        `\x1b[31m%s\x1b[0m`,
                        `file ${subFilePath} deleted`
                    )
                }
                continue
            }
            const subFileStructure = currentFolderFiles.find((subFileStructure) => subFileStructure.name === subFileName)
            if (!subFileStructure) {
                // delete this subFile
                const answer = await AskQuestion(`delete file ${subFilePath} ?  y/n`)
                if (answer.toLowerCase().trim() === 'y') {
                    fs.unlinkSync(subFilePath)
                    console.log(
                        // log in red
                        `\x1b[31m%s\x1b[0m`,
                        `file ${subFilePath} deleted`
                    )
                }
                continue
            }
        }

        const thisFolderHaveSubFolders = currentFolderReceived.subFolders
        if (thisFolderHaveSubFolders) {
            currentFolderReceived.subFolders?.forEach(subFolder => {
                const pathToSubFolder = `${currentPathReceived}/${subFolder.name}`
                this.checkAndDeleteUnlistedFilesForAllFoldersAndSubFolders({
                    depthLimit: depthLimitReceived, currentDepth: currentDepthReceived + 1,
                    currentPath: pathToSubFolder, currentFolder: subFolder,
                })
            })
        }
    }
}