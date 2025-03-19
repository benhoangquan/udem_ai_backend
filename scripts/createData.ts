import { getCliClient } from "sanity/cli"
import createActivityData from "./createActivityData"
import createGeneralInfoData from "./createGeneralInfoData"
import createMemberData from "./createMemberData"
import createResourceData from "./createResourceData"
import createPostData from "./createPostData"

const COUNT = 1
const client = getCliClient()

async function createData() {
  console.log(`Create new data with...`)
  console.log(`Project ID: ${client.config().projectId}`)
  console.log(`Dataset: ${client.config().dataset}`)


  for (let i = 0; i < COUNT; i++) {
    await createActivityData()
    await createGeneralInfoData()
    await createMemberData()
    await createResourceData()
    await createPostData()
  }
}

createData()