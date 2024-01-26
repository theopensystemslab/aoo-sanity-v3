import {createClient, type ClientConfig} from '@sanity/client'
import {customAlphabet} from 'nanoid'
import sanityConfig from '../sanity.config'

const config: ClientConfig = {
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  token: '', // put a writable token here
}
const client = createClient(config)

// const data = await client.fetch<number>(`count(*)`)

// data is typed as `number`
// console.log(`Number of documents: ${data}`)

const nanoid = customAlphabet('0123456789abcdef', 12)

const TYPE = 'entry'

const fetchDocuments = () => client.fetch(`*[_type == "${TYPE}"][0..50] {_id, _rev, description}`)

const go = async () => {
  const documents = await fetchDocuments()

  documents.forEach((doc: any) => {
    if (!doc.description) return

    const paragraphs = doc.description.split('\n')

    const content = paragraphs.map((paragraph: any) => ({
      _key: nanoid(),
      _type: 'block',
      markDefs: [],
      style: 'normal',
      children: [
        {
          _key: nanoid(),
          _type: 'span',
          marks: [],
          text: paragraph,
        },
      ],
    }))

    // const patch = {
    //   id: doc._id,
    //   patch: {
    //     set: {
    //       'content': output,
    //     },
    //     // ifRevisionID: doc._rev,
    //   },
    // }
    client.patch(doc._id).setIfMissing({content}).commit()
  })
}

go()
