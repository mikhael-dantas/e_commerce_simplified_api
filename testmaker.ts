import fs from 'fs';
import { UCFRSJSON } from "./ucfrs";


// tests folder tree = ucfrs -> unit | integration -> category -> category named file
// file structure = labels followed by "id:name" followed by test code
const salt = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
let ucfrControlLabel: string
let ucfrControlLabelFileMarker:string = "control424242";
let newUcfrControlLabel: string = `// controlLabel${salt}`
let endControlLabel:string = "// describeEndControlLabel4242"
let testFilesPathToAnalyze:string = "./__tests__/ucfrs"
let counterOneACtion = 0;

interface ITestFileToAnalyze {
   category: string,
   type: string,
   filePath: string,
   fileName: string
}


createControlledFilesAndTests()
checkFilesAndLabelsThenLogMissMatchers()


function createControlledFilesAndTests() {
   UCFRSJSON.ucfrs.forEach(ucfr => {
   
      ucfr.list.forEach(uc => {
         const category = ucfr.category;
         const testType = ucfr.type === "UC" ? "integration" : "unit";

         const folderPath = `./__tests__/ucfrs/${testType}/${category}`;
         const filePath = `${folderPath}/${category}.test.ts`;

         let contentForEmptyFile = `// ${ucfrControlLabelFileMarker}${newUcfrControlLabel}${ucfrControlLabelFileMarker}\n\ndescribe('integration tests', () => {\n\n${endControlLabel}\n});`
         createFolder(folderPath);
         createFile(filePath, contentForEmptyFile);
         
         
         // get the label wrote in the file between two ucfrControlLabelFileMarker strings
         const tempFileContent = fs.readFileSync(filePath, 'utf8');

         if (!ucfrControlLabel) {
            if(counterOneACtion === 1) { throw new Error("counterOneACtion is 1") }

            const tempFileLabels = tempFileContent.split(ucfrControlLabelFileMarker);
            const tempFileLabelsQuantity = tempFileLabels.length;
            if (tempFileLabelsQuantity !== 3) {
               throw new Error("wrong number of labels");
            }
            ucfrControlLabel = tempFileLabels[1];
         }

         // check if the label in the file between two ucfrControlLabelFileMarker is the old one and replace if it is
         const tempFileLabels = tempFileContent.split(ucfrControlLabelFileMarker);
         const tempFileLabelsQuantity = tempFileLabels.length;
         if (tempFileLabelsQuantity !== 3) {
            throw new Error("wrong number of labels");
         }
         const tempFileLabelsContent = tempFileLabels[1];
         if (tempFileLabelsContent === ucfrControlLabel) {
            const newTempFileContent = tempFileContent.replace(
               `${ucfrControlLabelFileMarker}${ucfrControlLabel}${ucfrControlLabelFileMarker}`,
               `${ucfrControlLabelFileMarker}${newUcfrControlLabel}${ucfrControlLabelFileMarker}`
            );
            fs.writeFileSync(filePath, newTempFileContent);
         }


         let contentLabelForThisTest = `\n${ucfrControlLabel}\n// ${uc.id} ${uc.name}`;
         let newContentLabelForThisTest = `\n${newUcfrControlLabel}\n// ${uc.id} ${uc.name}`;
         let contentLabelForPlacement = endControlLabel;

         checkFileContentAndWrite(filePath, contentLabelForThisTest, contentLabelForPlacement, uc.name, newContentLabelForThisTest);


         function createFolder(fPath: string) {
            const created = fs.mkdirSync(fPath, { recursive: true });
            if (created) {
               console.log(
                  `\x1b[32m%s\x1b[0m`,
                  `created folder ${folderPath}`
               );
            }
         }
         function createFile(fPath: string, fContent: string) {
            if (!fs.existsSync(fPath)) {
               fs.writeFileSync(fPath, fContent);
               console.log(
                  '\x1b[34m%s\x1b[0m',
                  `created file ${fPath}`
               );
            }
         }
         function checkFileContentAndWrite(fPath: string, fContent: string, fLabelPlacement: string, fTestName: string, fNewContent: string) {
            const testIsCreated = fs.readFileSync(fPath, 'utf8').includes(fContent)
            
            if (!testIsCreated) {
               const lines = fs.readFileSync(filePath, 'utf8').split('\n');
               let indexToPlace = lines.indexOf(fLabelPlacement) - 1;
               
               lines.splice(indexToPlace, 0, 
                  `${fNewContent}\ntest.concurrent('${fTestName}', async () => {expect(false).toBe(true)});`
               );
               fs.writeFileSync(fPath, lines.join('\n'));
               console.log(
                  `created test ${fNewContent}`
               );
            } else {
               // regex to find and replace the old content inside the file with the new one and rewrite the file
               const newFileContent = fs.readFileSync(fPath, 'utf8').replace(fContent, fNewContent);
               fs.writeFileSync(fPath, newFileContent);
            }
         }
      })
      console.log(`checked ${ucfr.type}-${ucfr.category}`);
   })
}

function checkFilesAndLabelsThenLogMissMatchers() {

   let testFilesToAnalyze: ITestFileToAnalyze[] = []
   let fUcfrsToAnalyze: ITestFileToAnalyze[] = []


   getTestFiles(testFilesPathToAnalyze, 0)
   const testsOutOfControl = compareAnalyzedFilesWithUcfrsAndReturnDifference()
   checkLabelsInFiles()
   if (testsOutOfControl.length > 0) {
      console.log(
         `\x1b[31m%s\x1b[0m`,
         "\nthe following files are out of ucfrs control:")
      testsOutOfControl.forEach(f => {
         console.log(f.filePath)
      })
   }


   function getTestFiles(path: string, depth: number) {
      if (depth > 10) {
         throw new Error("Too deep")
      }
   
      let files = fs.readdirSync(path)
      files.forEach(file => {
         let filePath = path + "/" + file
         let fileStat = fs.statSync(filePath)
         if (fileStat.isDirectory()) {
            getTestFiles(filePath, depth + 1)
         } else {
            if (file.endsWith(".test.ts")) {
               testFilesToAnalyze.push({
                  filePath: filePath,
                  fileName: file,
                  type: path.split("/")[3] === "integration" ? "UC" : path.split("/")[3] === "unit" ? "FR" : "",
                  category: path.split("/")[4]
               })
            }
         }
      }
      )
   }
   function compareAnalyzedFilesWithUcfrsAndReturnDifference() {
      UCFRSJSON.ucfrs.forEach(ucfr => {
         let fType = ucfr.type === "UC" ? "integration" : "unit"
         fUcfrsToAnalyze.push({
            filePath: `./__tests__/ucfrs/${fType}/${ucfr.category}/${ucfr.category}.test.ts`,
            fileName: `${ucfr.category}.test.ts`,
            type: ucfr.type,
            category: ucfr.category
         })
      })
   
      let fPaths = fUcfrsToAnalyze.map(f => f.filePath)
   
      return testFilesToAnalyze.filter(f => !fPaths.includes(f.filePath))
   }
   function checkLabelsInFiles() {
      fUcfrsToAnalyze.forEach(f => {
         let filePath = f.filePath
         let fileContent = fs.readFileSync(filePath, 'utf8')
         let fileName = f.fileName
         let fileLabels = fileContent.split("controlLabel")
         let fileLabelsQuantity = fileLabels.length - 1
         // check if the number of labels match of the corresponding ucfr list length
         const correspondingUcfr = UCFRSJSON.ucfrs.find(ucfr => ucfr.category === f.category && ucfr.type === f.type)
         if (!correspondingUcfr) {
            throw new Error("no corresponding ucfr");
         }
         if (fileLabelsQuantity !== correspondingUcfr.list.length + 1) {
            console.log(
               `\n\x1b[31m%s\x1b[0m`,
               `${fileName} has ${fileLabelsQuantity} (ucfrs+1 expected) labels but ${correspondingUcfr.list.length} ucfrs`
            )
         }
      })
   }
}