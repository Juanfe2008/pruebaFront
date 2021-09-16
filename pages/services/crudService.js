import axios from 'axios';

export default class CrudService {
  url = "http://localhost:8080/clientes";

  async getAll(){
     return await axios.get(this.url)
  }
}
