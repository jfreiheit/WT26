import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Dataservice } from '../shared/dataservice';
import { Member } from '../shared/member';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [ReactiveFormsModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnInit {

    private myservice = inject(Dataservice)
    members = signal<Member[]>([]);
    filteredMembers = signal<Member[]>([]);
    // members: WritableSignal<Member[]> = signal([]);
    search = new FormControl('');

    async ngOnInit(): Promise<void> {
      this.members.set(await this.myservice.getAllMembers())
      this.filteredMembers.set(this.members())
      console.log('filteredMembers (in table): ' , this.filteredMembers());
    }

    filter() {
      const value = this.search.value?.toLowerCase() || '';
      console.log('value : ', value);
      this.filteredMembers.set(this.members()
      .filter( m => m.forename.toLowerCase().includes(value) ||
                    m.surname.toLowerCase().includes(value) ||
                    m.email.toLowerCase().includes(value)
      ))
    }
}
