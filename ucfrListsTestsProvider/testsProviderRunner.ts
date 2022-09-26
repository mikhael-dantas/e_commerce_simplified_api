

// const pathToWrite = './__tests__'

// const markStringToIdentifyLabelReceived = 'labelReceived'
// const updatedLabelToControlFileInfoReceived = 'fileInfoReceived'
// let contentForEmptyFile = `// ${markStringToIdentifyLabelReceived}${updatedLabelToControlFileInfoReceived}${markStringToIdentifyLabelReceived}\n\n`


// const testsSpecificationObject = pickTestsSpecificationObject()

import { TestsWriter } from "./modules/TestsWriter/TestsWriter"

// const parsedTestsSpecification = readAndParseTestsSpecification()

const writer = new TestsWriter()
writer.checkAndCreateAllMissingFolders
writer.checkAndCreateMissingFilesForAllFoldersAndSubFolders
writer.enterFilesToCheckAndWriteControlledLines

// afterCheck