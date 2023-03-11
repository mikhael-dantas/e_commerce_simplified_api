import { PrismaClient } from "@prisma/client"

const fakeObjectArrayGenerator = (
   haveId: boolean,
   fieldNamesAndTypes: {[key: string]: string}[],
   numberOfObjects: number,
   haveCreatedAt: boolean,
   haveUpdatedAt: boolean,
   ): any[] => {
      const fakeObjectArray: any[] = []
      for (let i = 0; i < numberOfObjects; i++) {
         const fakeObject: any = {}
         if (haveId) {
            fakeObject.id = `${i}`
         }
         if (haveCreatedAt) {
            fakeObject.created_at = new Date()
         }
         if (haveUpdatedAt) {
            fakeObject.updated_at = new Date()
         }
         for (const fieldNameAndType of fieldNamesAndTypes) {
            const fieldName = Object.keys(fieldNameAndType)[0]
            const fieldType = fieldNameAndType[fieldName]
            switch (fieldType) {
               case 'string':
                  fakeObject[fieldName] = `${fieldName}_${i}`
                  break
               case 'number':
                  fakeObject[fieldName] = i
                  break
               case 'boolean':
                  fakeObject[fieldName] = i % 2 === 0
                  break
               default:
                  throw new Error(`Unknown field type ${fieldType}`)
            }
         }
         fakeObjectArray.push(fakeObject)
      }
      return fakeObjectArray
}
async function prismaSeed() {
   // const prisma = new PrismaClient()
   // // drop database
   // // push database schema
   // // push data
   // const products = await prisma.product.create(
   //    {
   //       data: {
   //          id: '1',
   //          name: 'Product 1',
   //          price: 1,
   //          description: 'Product 1 description',
   //          stock: 1,
   //       },
   //    }
   // )
   // const products2 = await prisma.product.create(
   //    {
   //       data: {
   //          id: '2',
   //          name: 'Product 2',
   //          price: 1,
   //          description: 'Product 2 description',
   //          stock: 1,
   //       },
   //    }
   // )
   console.log('Seeding succeeded')
}

prismaSeed()