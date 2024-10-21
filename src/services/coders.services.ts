import { Icoder } from "@/models/coders.models";
import { HttpClient } from "@/utils/client-https";

export class CoderService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  async findAll(): Promise<Icoder[]> {
    try {
      const coders = await this.httpClient.get<Icoder[]>("coders");
      return coders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async destroy(id: string): Promise<Icoder> {
    try {
      const response = await this.httpClient.delete<Icoder>(`coders/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async post(coder: Icoder): Promise<Icoder> { 
    try {
      const response = await this.httpClient.post<Icoder, Icoder>("coders", coder); 
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(coder: Icoder): Promise<Icoder> {
    try {
      const response = await this.httpClient.put<Icoder, Icoder>(`coders/${coder.id}`, coder);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
