import {Component, Input, OnInit, Output} from '@angular/core';
import {List} from '../app.component';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  form: FormGroup;
  @Input() list: List;

  constructor() {
  }

  ngOnInit() {
    this.form = new FormGroup({
      category: new FormControl(this.list.category),
      value: new FormControl(this.list.value),
      operators: new FormControl(this.list.operators),
      property: new FormControl(this.list.property),
    });
  }

  submit() {
    this.createTemplate();
  }

  createTemplate() {
    const {category, value, operators, property} = this.form.value;
    const template =
      `<?xml version="1.0" encoding="utf-8" ?>
      <SetInfo xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" SetKey="cFloors" DysplayName="Floors" CurrentVersion="1" Shared="0">
        <SetVersions SetVersionKey="cFloors-1" SetVersion="1">
          <Filters>
            <Condition>0</Condition>
            <ParamName>${property || ''}</ParamName>
            <DisplayName>${category || ''}</DisplayName>
            <Operator>${this.checkOperators(operators) || ''}</Operator>
            <Value>${value || ''}</Value>
          </Filters>
        </SetVersions>
      </SetInfo>`;
    this.downLoadFile(template);
  }

  downLoadFile(template) {
    const blob = new Blob([template], {type: 'text/xml'});
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  checkOperators(operator) {
    switch (operator) {
      case '<' :
        operator = '&lt;';
        break;
      case '>' :
        operator = '&lt;';
        break;
    }
    return operator;
  }

}
