export interface ITag {
    id: string;
    name: string;
    description: string;
}

export interface IUseCase {
    id: string
    moduleId: string
    tagIds: string[]
    name: string
    completed: boolean
    neededFrsToWorkIds: string[]
    useCasesPipelineIds: string[]
}

export interface INestedUseCase {
    id: string
    moduleId: string
    tagIds: string[]
    name: string
    completed: boolean
    neededFrsToWorkIds: string[]
    parentUseCaseId: string
    useCasesPipelineIds: string[]
}

export interface IFunctionalRequirement {
    id: string
    moduleId: string
    tagIds: string[]
    name: string
    completed: boolean
    frDependencies: string[]
}

export interface IModule {
    id: string
    name: string
    useCases: IUseCase[]
    nestedUseCases: INestedUseCase[]
    functionalRequirements: IFunctionalRequirement[]
}

export interface IUcfrLists {
    tags: ITag[]
    modules: IModule[]
}