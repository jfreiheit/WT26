import { Injectable } from '@angular/core';
import { Member } from './member';

@Injectable({
  providedIn: 'root',
})

export class Dataservice {

  async getAllMembers(): Promise<Member[]> {
    const response = await fetch('assets/members.json')
    return response.json();
  }
  
}
