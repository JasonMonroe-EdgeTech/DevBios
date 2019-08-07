import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { DeveloperService } from '../developer.service';
import { Router } from '@angular/router';
import { Developer } from '../developer';

@Component({
  selector: 'app-create-bio',
  templateUrl: './create-bio.component.html',
  styleUrls: ['./create-bio.component.css']
})
export class CreateBioComponent implements OnInit {

  devForm = this.fb.group({
    'firstName': new FormControl('',[Validators.required]),
    'lastName' : new FormControl('',[Validators.required]),
    'favoriteLanguage': new FormControl('',[Validators.required]),
    'yearStarted': new FormControl('',[Validators.required])
  })
  
  get firstName(){return this.devForm.get('firstName').value}
  get lastName(){return this.devForm.get('lastName').value}
  get favoriteLanguage(){return this.devForm.get('favoriteLanguage').value}
  get yearStarted(){return this.devForm.get('yearStarted').value}
  

  constructor(
    private fb:FormBuilder, 
    private developerService: DeveloperService,
    private router:Router
  ) { }

  
  prepareSave(): Developer{
    return new Developer(
      null,
      this.firstName,
      this.lastName,
      this.favoriteLanguage,
      this.yearStarted,
    );
  }

  saveDeveloper():void{
    let developer = this.prepareSave();
    this.developerService.addDeveloper(developer);
    this.router.navigate(['/bio']);
  }

  ngOnInit() {
  }

}
