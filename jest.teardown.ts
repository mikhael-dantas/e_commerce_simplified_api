module.exports = async function () {
   await new Promise(resolve => {
      const {__testServer__} = globalThis as any
      __testServer__.close(() => {
         // styling log
         const message = `TeardownFile: Server is closing`
         const styleTab = '-'.repeat(message.length + 2)
         // blue color
         const color = `\x1b[36m`
         console.log(color,'\n' + `${styleTab}\n${styleTab}\n`,)
         console.log(`\x1b[37m`, message)
         console.log(color,`\n${styleTab}\n${styleTab}`)
         // styling log
         resolve('done')
      })
   })
};