import { CoderService } from "@/services/coders.services";
import CodersTable from "@/app/coders/codersTable";

const useCoderService = new CoderService()

export default async function Home() {
  const data = await useCoderService.findAll()
  return <CodersTable data={data}/>
}