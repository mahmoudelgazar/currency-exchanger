import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExchangerService } from '../../services/exchanger.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exchanger-form',
  templateUrl: './exchanger-form.component.html',
})
export class ExchangerFormComponent implements OnInit {
  isSubmited = false;
  loading = false;
  isDisabeld = true;
  formGroup!: FormGroup;
  fromObj: any;
  toObj: any;
  convertedCurrency: any = null;
  @Input() latestList: any;
  @Input() from: any;
  @Input() to: any;
  @Output() isDetails = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private service: ExchangerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForms();
  }

  buildForms() {
    this.formGroup = this.formBuilder.group({
      amount: [null, [Validators.required]],
      from: [{ value: this.from, disabled: true }, [Validators.required]],
      to: [{ value: this.to, disabled: true }, [Validators.required]],
    });
  }

  hasError(formGroup: any, controlName: string, errorName: string) {
    return (
      formGroup.controls[controlName].hasError(errorName) &&
      formGroup.controls[controlName].touched
    );
  }

  getExchangeratesData() {
    const fromRow = this.latestList
      .filter((obj: any) => obj.key === this.formGroup.controls['from'].value)
      .map((obj: any) => obj);
    this.fromObj = fromRow[0];
    const toRow = this.latestList
      .filter((obj: any) => obj.key === this.formGroup.controls['to'].value)
      .map((obj: any) => obj);
    this.toObj = toRow[0];
    if (this.formGroup.controls['amount'].value) {
      this.formGroup.controls['to'].enable();
      this.formGroup.controls['from'].enable();
    } else {
      this.formGroup.controls['to'].disable();
      this.formGroup.controls['from'].disable();
    }
  }

  submit() {
    this.isSubmited = true;
    if (this.formGroup.valid) {
      this.loading = true;
      this.service.convert(this.formGroup.getRawValue()).subscribe(
        (data: any) => {
          this.loading = false;
          this.isSubmited = false;
          this.convertedCurrency = data;
        },
        (err: any) => {
          this.loading = false;
          this.isSubmited = false;
        }
      );
    }
  }

  navigateDetails() {
    let obj = {
      isDetails: true,
      fromObj: this.fromObj,
      toObj: this.toObj,
    };
    this.isDetails.emit(obj);
    // this.router.navigate(['/details', this.fromObj.key , this.toObj.key]);
  }
}
