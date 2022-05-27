import {Component, OnInit} from '@angular/core';
import {ICars} from "../../interfaces";
import {CarsService} from "../../services";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegEx} from "../../constans";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: ICars[];
  form: FormGroup;
  carFormUpdate: ICars | null;

  constructor(private carsService: CarsService) {
    this._createForm();
  }

  ngOnInit(): void {
    this.carsService.getAll().subscribe(value => this.cars = value);
  }

  save(): void {
    if (!this.carFormUpdate) {
      this.carsService.create(this.form.value).subscribe(value => {
        this.cars.push(value);
        this.form.reset();
      })
    } else {
      this.carsService.updateById(this.carFormUpdate.id, this.form.value).subscribe(value => {
        const updateCar = this.cars.find(f => f.id == this.carFormUpdate?.id);
        Object.assign(updateCar, value);
        this.carFormUpdate = null
      })
    }

  }

  delete(id: number): void {
    this.carsService.deleteById(id).subscribe(() => {
      const index = this.cars.findIndex(car => car.id = id);
      this.cars.splice(index, 1);
    })

  }

  _createForm(): void {
    this.form = new FormGroup({
      model: new FormControl(null, [Validators.pattern(RegEx.model)]),
      year: new FormControl(1990, [Validators.min(1990), Validators.max(new Date().getFullYear())]),
      price: new FormControl(0, [Validators.min(0), Validators.max(1000000)])
    })
  }

  update(car: ICars) {
    this.carFormUpdate = car;
    this.form.setValue({model: car.model, year: car.year, price: car.price})


  }
}
