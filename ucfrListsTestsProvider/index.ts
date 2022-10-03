import StringGenerator from "./modules/StringGenerator/StringGenerator"
import { TestsWriter } from "./modules/TestsWriter/TestsWriter"
import fs from 'node:fs'
import TestsSpecHandler from "./modules/TestsSpecHandler/TestsSpecHandler"

const pathToTests = './__tests__'

const testsSpecification = fs.readFileSync('./ucfrListsTestsProvider/example.json', 'utf-8')

const parsedAndValidatedTestsSpec = TestsSpecHandler.parseAndValidateFromJSON(testsSpecification)

{
    // labels to control the files that will be generated and managed by the tests writer
    const markStringToIdentifyTheLabel = 'lalabel4242'
    const newLabelToControlFileInfo = StringGenerator.generate(10) + Date.now()
    const oldLabelToControlFileInfo = ''
    let contentForEmptyFile = `// ${markStringToIdentifyTheLabel}${newLabelToControlFileInfo}${markStringToIdentifyTheLabel}\n\n`

    TestsWriter.checkAndCreateAllMissingFolders({
        currentDepth: 0,
        currentFolder: parsedAndValidatedTestsSpec,
        currentPath: pathToTests,
        depthLimit: 10,
    })
    
    TestsWriter.checkAndCreateMissingFilesForAllFoldersAndSubFolders({
        currentDepth: 0,
        depthLimit: 10,
        currentFolder: parsedAndValidatedTestsSpec,
        currentPath: pathToTests,
        contentForEmptyFile: contentForEmptyFile,
        markStringToIdentifyLabel: markStringToIdentifyTheLabel,
        updatedLabelToControlFileInfo: newLabelToControlFileInfo,
    })
    
    TestsWriter.enterFilesToCheckAndWriteControlledLines({
        currentDepth: 0,
        depthLimit: 10,
        currentFolder: parsedAndValidatedTestsSpec,
        currentPath: pathToTests,
        markStringToIdentifyLabel: markStringToIdentifyTheLabel,
        updatedLabelToControlFileInfo: newLabelToControlFileInfo,
        parsedTestsSpecification: parsedAndValidatedTestsSpec,
        oldLabelToControlFileInfo: oldLabelToControlFileInfo,
    })
}

