import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import data from '../../assets/units.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: "app-conversions",
  templateUrl: "./conversions.component.html",
  styleUrls: ["./conversions.component.css"]
})
export class ConversionsComponent implements OnInit {
  conversionForm: FormGroup;
  entries: FormArray;
  units: any = data;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.conversionForm = this.formBuilder.group({
      entries: this.formBuilder.array([this.createBlankEntry()])
    });
  }

  createBlankEntry(): FormGroup {
    return this.formBuilder.group({
      inputValue: [null, Validators.required],
      inputUnit: [null, Validators.required],
      targetUnit: [null, Validators.required],
      studentResponse: [null, Validators.required],
      output: ''
    });
  }

  addNewEntry(): void {
    this.entries = this.conversionForm.get('entries') as FormArray;
    this.entries.push(this.createBlankEntry());
  }

  deleteEntry(index): void {
    this.entries = this.conversionForm.get('entries') as FormArray;
    this.entries.removeAt(index);
  }

  checkStudentResponses() {
    const entries = this.conversionForm.getRawValue().entries;
    let listOfcall = [];

    entries.forEach(entry => {
      listOfcall.push(this.http.post('http://localhost:3000/api/checkresponses', entry, this.httpOptions));
    })
    forkJoin(listOfcall).subscribe(res => {
      this.conversionForm.patchValue({
        entries : res
      })
    })
  }

  resetForm(){
    this.conversionForm.reset();
  }
}
