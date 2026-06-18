import { Injectable } from '@angular/core';
import { Member } from './member';

@Injectable({
  providedIn: 'root',
})
export class Memberservice {

  private members: Member[] = [];

  async getMembers(): Promise<Member[]> {
 
    /*
    return fetch('members.json')
    .then( resp => resp.json() )
    .then( jsonData => {
      this.members = jsonData 
      console.log('im service : ' , this.members)
      return this.members
    })
      */

    const response = await fetch('assets/members.json')
    const jsonData = await response.json()
    this.members = jsonData
    console.log('im service : ' , this.members)
    return this.members;
  }
  
}
