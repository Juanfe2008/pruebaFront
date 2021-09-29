import axios from 'axios';

export default class CrudService {
  url = "http://localhost:8080/clientes";

   async getAll(){
     return await axios.get(this.url)
  }

   save(persona) {
    return  axios.post(this.url, persona)
  }

  delet(id){
    return axios.delete(this.url+"/"+id)
  }
}
