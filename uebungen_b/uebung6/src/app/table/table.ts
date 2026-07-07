import { Component, inject, OnInit, signal } from '@angular/core';
import { Dataservice } from '../shared/dataservice';
import { Member } from '../shared/member';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [ReactiveFormsModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnInit{
  
  memberservice = inject(Dataservice)
  members = signal<Member[]>([]);
  filterMembers = signal<Member[]>([]);

  search = new FormControl('')

  async ngOnInit(): Promise<void> {
    const data = await this.memberservice.getAllMembers()
    this.members.set(data)
    this.filterMembers.set(this.members())
    console.log('members in table : ', this.members())
  }

  filter() {
    console.log('in filter', this.search.value)
    const value = this.search.value?.toLowerCase() || '';
    this.filterMembers.set(this.members().filter( m => 
      m.forename.toLowerCase().includes(value) || 
      m.surname.toLowerCase().includes(value) || 
      m.email.toLowerCase().includes(value)) )
  }

}
