import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {from, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {UserModel} from '../../../../shared/models/user.model';
import {AppState} from '../../../../reducers';
import {Store} from '@ngrx/store';
import {selectUser} from '../../../authorization/auth.selectors';
import {BannerColorService} from '../../../../core/services/banner-color.service';

@Component({
  selector: 'app-profile-short-info',
  templateUrl: './profile-short-info.component.html',
  styleUrls: ['./profile-short-info.component.scss']
})
export class ProfileShortInfoComponent implements OnInit {
  form: FormGroup;
  $user: Observable<UserModel>;
  // validFileExtensions: validFileExtension[] = ['png', 'jpg', 'jpeg'];
  // validMimeTypes: validMimeType[] = ['image/png', 'image/jpg', 'image/jpeg'];
  userFullImagePath: string;

  constructor(
    public store: Store<AppState>,
    public bannerColorService: BannerColorService
  ) {
  }

  ngOnInit() {
    this.$user = this.store.select(selectUser);
    this.form = new FormGroup({
      file: new FormControl(null),
    });
  }

  //
  // onFileSelect(event: Event): void {
  //   const file: File = (event.target as HTMLInputElement).files[0];
  //   if (!file) return;
  //
  //   const formData = new FormData();
  //   formData.append('file', file);
  //
  //   from(file.arrayBuffer())
  //     .pipe(
  //       switchMap((buffer: Buffer) => {
  //         return from(fromBuffer(buffer)).pipe(
  //           switchMap((fileTypeResult: FileTypeResult) => {
  //             if (!fileTypeResult) {
  //               // TODO: error handling
  //               console.log({ error: 'file format not supported!' });
  //               return of();
  //             }
  //             const { ext, mime } = fileTypeResult;
  //             const isFileTypeLegit = this.validFileExtensions.includes(
  //               ext as any
  //             );
  //             const isMimeTypeLegit = this.validMimeTypes.includes(mime as any);
  //             const isFileLegit = isFileTypeLegit && isMimeTypeLegit;
  //             if (!isFileLegit) {
  //               // TODO: error handling
  //               console.log({
  //                 error: 'file format does not match file extension!',
  //               });
  //               return of();
  //             }
  //             return this.authService.uploadUserImage(formData);
  //           })
  //         );
  //       })
  //     )
  //     .subscribe();
  //
  //   this.form.reset();
  // }

}
