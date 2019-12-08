import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { HomeServiceService, ToDoData, Category } from '../home-service.service';
import { trigger, transition, animate, style } from '@angular/animations'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-20%)' }),
        animate('300ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(-20%)' }))
      ])
    ])
  ]
})

export class HomeComponent implements OnInit {
  private visible: boolean = false;
  private show: boolean = false;
  private showCat: boolean = false;
  selectedValue: string = '';
  todoData: ToDoData[];
  category: Category[];
  inputForm: FormGroup;
  editForm: FormGroup;
  inputCategory:FormGroup
  _id: any;
  _name: any;
  _status: any;
  _category: any;
  _quantity: any;
  _category_id: any;
  private todoEdit: ToDoData;


  constructor(
    private _homeService: HomeServiceService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.inputCategory =this.formBuilder.group({
      category : ['',Validators.required]
    })
    this.editForm = this.formBuilder.group({
      id: this._id,
      editname: [''],
      editquantity: [''],
      editstatus: [''],
      editcategory: [''],
      // catValue : ['', Validators.required],
    })
    this.inputForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      status: ['', Validators.required],
      category: ['', Validators.required],
      catValue: ['', Validators.required],
    })
    this._homeService.getToDo()
      .subscribe((data: ToDoData[]) => {
        this.todoData = data;
        console.log(this.todoData);
      })
    this._homeService.getCat()
      .subscribe((data2: Category[]) => {
        this.category = data2;
        console.log(this.category)
      })
    this.todoEdit = {
      tId: '',
      name: '',
      status: '',
      quantity: '',
      category: '',
      category_id: ''
    }
  }

  onSubmit() {
    console.log(this.inputForm.value)
    this._homeService.createList(this.inputForm.value)
      .subscribe((data => {
        location.reload();
      }))
    
  }
  inputCat(){
    this._homeService.createCategory(this.inputCategory.value)
    .subscribe((data =>{
      location.reload();
        console.log("success", this.inputCategory.value);
    }))
  }

  edit(todoData: ToDoData) {
    this._id = todoData.tId;
    this._name = todoData.name;
    this._status = todoData.status;
    this._status = this._status == 1 ? "Active" : "Inactive";
    this._quantity = todoData.quantity;
    this._category = todoData.category;
    this._category_id = todoData.category_id;



    this.todoEdit.tId = this._id;
    this.todoEdit.category = this._category;
    this.todoEdit.name = this._name;
    this.todoEdit.quantity = this._quantity;
    this.todoEdit.status = this._status == "Active" ? "1" : "0";
    this.todoEdit.category_id = this._category_id;

    this.editForm.value.editname = this._name;
    this.editForm.value.editquantity = this._quantity;
    this.editForm.value.editcategory = this._category_id;
    this.editForm.value.editstatus = this._status == "Active" ? "1" : "0";
    console.log(todoData);
    console.log(this.todoEdit, 'todoEdit on edit()');
  }

  onEdit() {
    console.log(this.editForm);
    this.todoEdit.tId = this._id;
    this.todoEdit.category_id = this.editForm.value.editcategory == "" ? this.todoEdit.category_id : this.editForm.value.editcategory;
    this.todoEdit.name = this.editForm.value.editname == "" ? this.todoEdit.name : this.editForm.value.editname;
    this.todoEdit.quantity = this.editForm.value.editquantity == "" ? this.todoEdit.quantity : this.editForm.value.editquantity;
    this.todoEdit.status = this.editForm.value.editstatus == "" ? this.todoEdit.status : this.editForm.value.editstatus;
    this._homeService.updateList(this.todoEdit).subscribe(() => {
      location.reload();
      console.log('success', this.todoEdit);

    }),
      error => {
        console.log('error');

      }

  }

  toggleShow() {
    this.visible = !this.visible;
  }

  showFormCat() {
    this.showCat = !this.showCat;
  }

  showForm() {
    this.show = !this.show;
  }

  delete(todoData: ToDoData): void {
    this._homeService.deleteList(todoData.tId)
      .subscribe((data => {
        this.todoData = this.todoData.filter(u => u !== todoData);
      }))

  }
}
