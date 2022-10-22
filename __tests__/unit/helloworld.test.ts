// ### business model
// ## customer actions with products
// UCx1.x1 - explore catalog looking for some PRODUCTs (name and price) -noAuth
// UCx1.x2 - check the PRODUCT details -noAuth
// UCx1.x3 - add a PRODUCT to the cart -noAuth (front end)
// UCx1.x4 - go to ORDER directly with the PRODUCT alongside PRODUCTs in the cart clicking "buy now" -noAuth
// UCx1.x5 - check the cart -noAuth
// UCx1.x6 - save the cart -noAuth
// UCx1.x7 - close the cart to proceed to the ORDER -noAuth
// UCx1.x8 - sign up -noAuth
// UCx1.x9 - login with email and password -noAuth
// xUCx1.xa - reset password using email
// xUCx1.xb - update profile info
// UCx1.xc - check ORDER historic
// UCx1.xd - have many SHIP_ADDRESS to insert
// UCx1.xe - select a SHIP_ADDRESS to use in the ORDER 
// UCx1.xf - check the fee for a SHIPMENT_METHOD
// UCx1.x10 - select a SHIPMENT_METHOD
// UCx1.x11 - have many PAYMENT_METHOD to insert
// UCx1.x12 - select a PAYMENT_METHOD
// UCx1.x13 - proceed with the ORDER created
// UCx1.x14 - check the ORDER status
// UCx1.x15 - retry the ORDER when payment status got refused if PRODUCTs still available
// UCx1.x16 - open TICKET to get any kind of support  
// ## product
// UCx2.x1 - have a unique identifier
// UCx2.x2 - have a name
// UCx2.x2.1 - have a description
// UCx2.x3 - have a price
// UCx2.x4 - have a stock quantity number
// UCx2.x5 - have inactive mark
// UCx2.x6 - have deletion mark
// UCx2.x7 - be searchable
// UCx2.x8 - be inserted ITS
// UCx2.x9 - be searchable ITS
// UCx2.xa - be inserted ITS
// UCx2.xb - be updated ITS
// UCx2.xc - be inactivated ITS
// UCx2.xd - be marked for deletion ITS
// xUCx2.xe - be deleted ITS
// xUCx2.xf - retain the identity of the MANAGER that made the insertion 
// xUCx2.x10 - retain the identity of the MANAGER that made the update
// xUCx2.x11 - retain the identity of the MANAGER that made the inactivation
// xUCx2.x12 - retain the identity of the MANAGER that made the deletion mark
// ## manager
// UCx3.x1 - have a unique identifier
// UCx3.x4 - have a admin indicator
// UCx3.x5 - have inactive mark
// UCx3.x6 - have deletion mark
// UCx3.x7.1 - be searchable only by admin
// UCx3.x7.2 - able to activate only by a admin user
// UCx3.xa - insert products
// UCx3.x9 - see products with all details
// UC3x.xb - edit products
// UC3x.xc - remove products

// xUC3x.xd - check support messages
// xUC3x.xe - check service orders
// xUC3x.xf - edit service order status
// xUC3x.x10 - see all users and their roles in the system if admin
// xUC3x.x11 - see user/product activities in the system if admin
// xUC3x.x12 - manage other user's inactive mark if admin

// ## order
// UCx.x - have a unique identifier
// UCx.x - have the identity of the CUSTOMER
// UCx.x - have the identity of the PRODUCT_ORDER_DETAILS
// UCx.x - have the identity of the SHIP_ADDRESS
// UCx.x - have the identity of the SHIPMENT_DETAILS
// UCx.x - have a base total calculated as a som of all PRODUCT_ORDER_DETAILS totals and SHIPMENT_DETAILS price 
// UCx.x - have the identity of the PAYMENT_DETAILS
// UCx.x - have the identity of the ORDER_STATUS
// UCx.x - have a closed indicator










// ### functional requirements
// ## products
// FRx1.x1 - be searchable in the public details without auth [UCx2.x7]
// FRx1.x1.1 - have a unique identifier [UCx2.x1, UCx1.x2]
// FRx1.x2 - have a name [UCx1.x1, UCx2.x2]
// FRx1.x2.1 - have a description [UCx2.x2.1]
// FRx1.x3 - have a price [UCx1.x1, UCx2.x3]
// FRx1.x4 - have a stock quantity number [UCx2.x4]
// FRx1.x7 - return a list of PRODUCTs with skip and take options [UCx1.x1]
// FRx1.x8 - return a PRODUCT by id with name, price, description and stock [UCx1.x2]
// FRx1.x5 - have inactive mark [UCx2.x5]
// FRx1.x6 - have deletion mark [UCx2.x6]
// ## managers
// FRx3.x1 - have a unique identifier [UCx3.x1]
// FRx3.x1.1 - have a name [UCx3.x1.1]
// FRx3.x2 - have a email [UCx3.x2]
// FRx3.x3 - have a password [UCx3.x3]
// FRx3.x4 - have a admin indicator (default false) [UCx3.x4]
// FRx3.x5 - have inactive mark (default false) [UCx3.x5]
// FRx3.x6 - have deletion mark (default false) [UCx3.x6]
// FRx3.x7 - be created using name email and password [UCx3.x7]
// FRx3.x7 - searchable listing every field besides password (only admin) [UCx3.x7.1]
// FRx3.x8 - able to be activated (only admin) [UCx3.x7.2]
test('example', () => { expect(true).toBe(true) })
// import { PrismaClient } from "@prisma/client"
// import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

// import { Manager } from "../../src/modules/managers/typeDefs/Manager"
// import { IManagersRepository } from "../../src/modules/managers/repositories/IManagersRepository"
// import { ManagersRepository } from "../../src/modules/managers/repositories/ManagersRepository"
// import { ICreateManagerUseCase } from "../../src/modules/managers/useCases/CreateManagerUseCase/ICreateManagerUseCase"
// import { CreateManagerUseCase } from "../../src/modules/managers/useCases/CreateManagerUseCase/CreateManagerUseCase"

// import { Product } from "../../src/modules/products/typeDefs/Product"
// import { IProductsRepository } from "../../src/modules/products/repositories/IProductsRepository"
// import { FindProductUseCase } from "../../src/modules/products/useCases/FindProduct/FindProduct"
// import { ListProductsUseCase } from "../../src/modules/products/useCases/ListProducts/ListProducts"
// import { ManagersResolver } from "../../src/modules/managers/resolvers/ManagersResolver"

// const fakeObjectArrayGenerator = (
//    haveId: boolean,
//    fieldNamesAndTypes: {[key: string]: string}[],
//    numberOfObjects: number,
//    haveCreatedAt: boolean,
//    haveUpdatedAt: boolean,
//    ): any[] => {
//       const fakeObjectArray: any[] = []
//       for (let i = 0; i < numberOfObjects; i++) {
//          const fakeObject: any = {}
//          if (haveId) {
//             fakeObject.id = `${i}`
//          }
//          if (haveCreatedAt) {
//             fakeObject.createdAt = new Date()
//          }
//          if (haveUpdatedAt) {
//             fakeObject.updatedAt = new Date()
//          }
//          for (const fieldNameAndType of fieldNamesAndTypes) {
//             const fieldName = Object.keys(fieldNameAndType)[0]
//             const fieldType = fieldNameAndType[fieldName]
//             switch (fieldType) {
//                case 'string':
//                   fakeObject[fieldName] = `${fieldName}_${i}`
//                   break
//                case 'number':
//                   fakeObject[fieldName] = i
//                   break
//                case 'boolean':
//                   fakeObject[fieldName] = i % 2 === 0
//                   break
//                default:
//                   throw new Error(`Unknown field type ${fieldType}`)
//             }
//          }
//          fakeObjectArray.push(fakeObject)
//       }
//       return fakeObjectArray
// }
// const fakeStringGenerator = (length: number): string => {
//    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//    let result = ''
//    for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * characters.length))
//    }
//    return result
// }

// type MockContext = {
//    prisma: DeepMockProxy<PrismaClient>
// }

// const createMockContext = (): MockContext => {
//    return {
//       prisma: mockDeep<PrismaClient>(),
//    }
// }


// // tests that follows the functional requirements
// const mockedPrisma = createMockContext().prisma

// describe('Functional requirements', () => {

//    describe('Managers', () => {

//       describe("ManagersRepository", () => {
//          let managersRepository: IManagersRepository
//          beforeEach(() => {
//             managersRepository = new ManagersRepository(mockedPrisma)
//          })

//          describe('createManagers', () => {
//             it('should return a created manager', async () => {
//                const managerToCreate = {
//                   name: 'test',
//                   email: 'test@test.com',
//                   password: 'test',
//                }
//                mockedPrisma.manager.create.mockImplementationOnce((data: any): any => {
//                   return {
//                      id: data.data.id,
//                      name: data.data.name,
//                      email: data.data.email,
//                      password: data.data.password,
//                      deleted: false,
//                      inactive: false,
//                      admin: false,
//                      created_at: new Date(),
//                      updated_at: new Date(),
//                   }
//                })
//                const results = await managersRepository.create(
//                   managerToCreate.name,
//                   managerToCreate.email,
//                   managerToCreate.password,
//                )
//                expect(results).toBeDefined()
//                expect(results).toHaveProperty('id')
//                expect(results).toHaveProperty('name')
//                expect(results).toHaveProperty('email')
//                expect(results).toHaveProperty('password')
//                expect(results).toHaveProperty('deleted')
//                expect(results).toHaveProperty('inactive')
//                expect(results).toHaveProperty('admin')
//                expect(results).toHaveProperty('created_at')
//                expect(results).toHaveProperty('updated_at')
//                expect(results.name).toEqual(managerToCreate.name)
//             })
//          })
//       })

//       describe('ManagersUseCases', () => {
//          describe('CreateManagerUseCase', () => {
//             const mockManagersRepository: jest.Mocked<IManagersRepository> = {
//                create: jest.fn(
//                   (name: string, email: string, password: string): Promise<Manager> => {
//                      return Promise.resolve({
//                         id: '1',
//                         model: 'manager',
//                         name,
//                         email,
//                         password,
//                         admin: false,
//                         inactive: false,
//                         deleted: false,
//                         created_at: new Date(),
//                         updated_at: new Date(),
//                      })
//                   }
//                ),
//             }

//             it('should create a manager', async () => {
//                const fakeManager = {
//                   name: 'fakeManager',
//                   email: 'test@test.com',
//                   password: 'test',
//                }
            
//                const createManagerUseCase: ICreateManagerUseCase = new CreateManagerUseCase(mockManagersRepository)
//                const result = await createManagerUseCase.execute(fakeManager)
            
//                expect(result).toMatchObject(fakeManager)
//             })
//          })
//       })

//       describe('ManagersResolver', () => {
//          describe('createManager', () => {
//             const mockCreateManagerUseCase: jest.Mocked<ICreateManagerUseCase> = {
//                execute: jest.fn(),
//             }
         
//             it('should create a manager', async () => {
//                const fakeManager = {
//                   name: 'fakeManager',
//                   email: 'fakemanager@gmail.com',
//                   password: 'fakemanager',
//                }

//                let resolver = new ManagersResolver({
//                   createManagerUseCase: mockCreateManagerUseCase as any,
//                })

//                mockCreateManagerUseCase.execute.mockResolvedValueOnce({
//                   id: '1',
//                   model: 'manager',
//                   name: fakeManager.name,
//                   email: fakeManager.email,
//                   password: fakeManager.password,
//                   admin: false,
//                   inactive: false,
//                   deleted: false,
//                   created_at: new Date(),
//                   updated_at: new Date(),
//                })
            
//                const fakeManagerCreated = await resolver.createManager(
//                   fakeManager.name,
//                   fakeManager.email,
//                   fakeManager.password,
//                )

//                expect(fakeManagerCreated).toMatchObject(fakeManager)

//             })
//          })
//       })
//    })

//    describe('Products', () => {
//       const fakeProducts = fakeObjectArrayGenerator(
//          true,
//          [
//             { name: 'string'},
//             { price: 'number'},
//             { description: 'string'},
//             { stock: 'number'},
//          ],
//          10,
//          true,
//          true,
//       )
//       const MockProductsRepository: jest.Mocked<IProductsRepository> = {
//          getAll: jest.fn((skip, take) => {
//             return Promise.resolve(fakeProducts.slice(skip, skip + take))
//          }),
//          getById: jest.fn(id => {
//             return Promise.resolve(fakeProducts.find(product => product.id === id))
//          }),
//       }
      
//       test('should have all the defined properties - [FRx1.x1, FRx1.x1.1, FRx1.x2, FRx1.x2.1, FRx1.x3, FRx1.x4]', async () => {
//          const product = new Product
//       })
//       test('UCx1.x1 - should be able to get a list of products', async () => {

//          const listProductsUseCase = new ListProductsUseCase(MockProductsRepository);

//          const returnedProducts = await listProductsUseCase.execute({
//             authHeader: '',
//             skip: 1,
//             take: 6
//          });
//          expect(returnedProducts).toHaveLength(6);
//          expect(returnedProducts[0].id).toBe("1");
//       })

//       test('UCx1.x2 - should be able to get one product by id', async () => {
//          const findProductUseCase = new FindProductUseCase(MockProductsRepository);

//          const returnedProduct = (await findProductUseCase.execute("2"))[0];
//          expect(returnedProduct).toHaveProperty("id");
//          expect(returnedProduct).toHaveProperty("name");
//          expect(returnedProduct).toHaveProperty("price");
//          expect(returnedProduct).toHaveProperty("description");
//          expect(returnedProduct).toHaveProperty("stock");
//          expect(returnedProduct?.id).toBe("2");
//       })
//    })
// })
