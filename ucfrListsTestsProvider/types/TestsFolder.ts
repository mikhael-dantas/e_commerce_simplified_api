import { IFunctionalRequirement, INestedUseCase, IUseCase } from "./ucfrLists";

export type IFolderStructure = {
    name: string;
    subFolders: IFolderStructure[] | null;
    files: IFileStructure[] | null;
};
export type IFileStructure = {
    name: string;
    content: object[] | Object;
    type: 'useCase' | 'nestedUseCase' | 'functionalRequirement';
};


export interface ITestsFolder extends IFolderStructure {
    name: string;
    subFolders: ({
        name: 'integration';
        subFolders: IUseCasesModuleFolder[];
        files: null;
    } | {
        name: 'unit';
        subFolders: IFunctionalRequirementModuleFolder[];
        files: null;
    })[],
    files: null
}


export interface IUseCasesModuleFolder extends IFolderStructure {
    name: string
    subFolders: IUseCaseFolder[]
    files: null
}

export interface IUseCaseFolder extends IFolderStructure {
    name: string,
    subFolders: INestedUseCaseFolder[],
    files: {
            name: 'index.test.ts',
            content: IUseCase,
            type: 'useCase'
        }[],
}

export interface INestedUseCaseFolder extends IFolderStructure {
    name: 'nestedUseCases',
    subFolders: null,
    files: {
            name: 'nestedUseCases.test.ts'
            content: INestedUseCase[],
            type: 'nestedUseCase'
        }[]
}


export interface IFunctionalRequirementModuleFolder extends IFolderStructure {
    name: string,
    subFolders: IFunctionalRequirementFolder[],
    files: null,
}

export interface IFunctionalRequirementFolder extends IFolderStructure {
    name: string,
    subFolders: null,
    files: [{
            name: 'index.test.ts',
            content: IFunctionalRequirement,
            type: 'functionalRequirement'
        }]
}
