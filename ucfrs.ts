export interface IUcfrItem {
   id: string,
   done: boolean,
   name: string,
   dependencies: string[]
}

export interface IUcfrs {
   ucfrs: {
      category: string,
      type: string,
      list: IUcfrItem[]
   }[], 
   newUcfr: string,
   newItem: string,
   newDependency: string
}

export const UCFRSJSON: IUcfrs = {"ucfrs":[{"category":"Product","type":"UC","list":[{"id":"e7bbc225-b3ef-4bfb-a0f3-b0c591bc4ecb","done":false,"name":"have a proper schema with: id, name, price, description, stock, inactive, deletion_mark","dependencies":[]},{"id":"523325ed-3ee2-42c9-9c36-8cef071db427","done":false,"name":"be able to be created only by an active manager passing [name, price, description, stock] [inactive: optional]","dependencies":["e7bbc225-b3ef-4bfb-a0f3-b0c591bc4ecb","12bb5407-e15c-49d9-88bb-a52bb11933d9","567c8eb0-1100-4a60-adeb-99749c64e1f7"]},{"id":"706e0177-815d-4a25-ab1e-5b6e2a24d503","done":false,"name":"be searchable in the fields [id, name and price] of active products paginated passing options [skip, take]","dependencies":["e7bbc225-b3ef-4bfb-a0f3-b0c591bc4ecb"]},{"id":"c6cea720-1c54-4d0a-ad39-e2e45021ad3f","done":false,"name":"be searchable in all fields of all products only by an active manager","dependencies":["12bb5407-e15c-49d9-88bb-a52bb11933d9","567c8eb0-1100-4a60-adeb-99749c64e1f7"]}]},{"category":"Customer","type":"UC","list":[{"id":"f0b88b17-0b63-4e51-8db5-5f14ff209a09","done":false,"name":"have a proper schema with: id, possesserId","dependencies":["01f701b7-87da-41e3-91fa-52e9e617d728"]}]},{"category":"Auth","type":"UC","list":[{"id":"01f701b7-87da-41e3-91fa-52e9e617d728","done":false,"name":"have a proper schema with: [id, name, email, password]","dependencies":[]},{"id":"ed2c184a-24c2-44f0-bab0-00380fab2c20","done":false,"name":"be able to be created by passing an unique [email], and a [password, name]","dependencies":[]},{"id":"567c8eb0-1100-4a60-adeb-99749c64e1f7","done":false,"name":"get a auth token by passing the correct email and password","dependencies":["01f701b7-87da-41e3-91fa-52e9e617d728"]}]},{"category":"Manager","type":"UC","list":[{"id":"12bb5407-e15c-49d9-88bb-a52bb11933d9","done":false,"name":"have a proper schema with: [id, possesserID, active]","dependencies":["01f701b7-87da-41e3-91fa-52e9e617d728"]},{"id":"1b310da5-ad73-4caa-844f-6ee6d982f06f","done":false,"name":"be able to be created only by a logged possesser by passing nothing","dependencies":["567c8eb0-1100-4a60-adeb-99749c64e1f7"]},{"id":"edeb5be7-eca4-4aab-b57c-f11524266c3d","done":false,"name":"be able to be activated only by and admin manager by passing the manager [id]","dependencies":["567c8eb0-1100-4a60-adeb-99749c64e1f7","12bb5407-e15c-49d9-88bb-a52bb11933d9"]}]}],"newUcfr":"","newItem":"","newDependency":""}
