module.exports = async function () {
   if(process.env.DB) {

      await new Promise(resolve => {
         const {_testServer_} = globalThis as any
         _testServer_.close(() => {
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
      await new Promise(resolve => setTimeout(resolve, 7000))
      process.exit(0)
   }
};