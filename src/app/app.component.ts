import {Component} from '@angular/core';
import * as xmlJs from 'xml-js';

export interface List {
  category: string;
  property: string;
  operators: string;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  list: List[] = [];

  readFile(file) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const json = this.getXmlToJson(fileReader.result);
      this.getList(JSON.parse(json));
    };
    fileReader.readAsText(file);
  }

  getMultipleFiles(e) {
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      if (!file || file.type !== 'text/xml') {
        return;
      }
      this.readFile(file);
    }
  }

  getXmlToJson(xml: string | ArrayBuffer) {
    return xmlJs.xml2json(xml as string, {compact: true, spaces: 4});
  }

  getList(data) {
    const {Value, ParamName, Operator, DisplayName} = data.SetInfo.SetVersions.Filters;
    const list = {
      category: DisplayName._text,
      property: ParamName._text,
      operators: Operator._text,
      value: Value._text
    };
    this.updateList(list);
  }

  updateList(list) {
    this.list.unshift(list);
  }

  createList() {
    const newList = {
      category: '',
      property: '',
      operators: '',
      value: ''
    };
    this.list.unshift(newList)
  }
}
