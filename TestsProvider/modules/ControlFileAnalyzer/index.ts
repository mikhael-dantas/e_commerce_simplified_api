import fs from 'node:fs'

export default class ControlFileAnalyzer {
    public static getControlLabel(pathToJsonFile: string) {
        const controlFileContent = fs.readFileSync(pathToJsonFile, 'utf-8')
        const parsedControlFileContent = JSON.parse(controlFileContent)
        return parsedControlFileContent.label
    }
}