import {createClient, type ClientConfig} from '@sanity/client'
import sanityConfig from '../sanity.config'

const config: ClientConfig = {
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  useCdn: false, // `false` to ensure fresh data
  apiVersion: '2023-05-03', // use a recent date to target the latest API version
  token: '', // your writable token here
}

const client = createClient(config)

const TYPE = 'entry' // Replace with your actual document type

// Utility function to parse year from ISO date string
const extractYear = (isoDateString: string | null): number | null => {
  return isoDateString ? new Date(isoDateString).getFullYear() : null
}

const fetchDocuments = async () => {
  const query = `*[_type == "${TYPE}"]{
    _id,
    _rev,
    dates {
      start,
      end
    }
  }`
  return await client.fetch(query)
}

const migrateYears = async () => {
  const documents = await fetchDocuments()

  await Promise.all(
    documents.map(async (doc: any) => {
      const {start, end} = doc.dates || {}
      const startYear = extractYear(start) // Convert start date to year
      const endYear = extractYear(end) // Convert end date to year

      // console.log({startYear, endYear})

      // if (startYear !== null || endYear !== null) {
      await client
        .patch(doc._id)
        .set({
          'dates.startYear': startYear,
          'dates.endYear': endYear,
        })
        // .toJSON()
        // console.log(foo)
        // .unset(['dates.start', 'dates.end']) // Optional: remove old date fields
        .commit()
      // }
    }),
  )

  console.log('Migration completed!')
}

migrateYears().catch(console.error)
