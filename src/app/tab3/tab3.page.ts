import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  users : any
  userName : string
  avatar : string
  userId : string
  displayName: string
  displayNameFige : string
  myPhoto : string = ""

  constructor(private userService : UserService, private camera: Camera) {

   }

   ngOnInit() {
    let self = this

    
    this.userService.getCurrentUser().then(function (user) {
      self.userId = user.uid
      self.userService.getUserById(user.uid).subscribe(user => {
        if(self.myPhoto === ""){

          self.myPhoto = user.payload.data().avatar
        }
      })
    
      
    }).then(() => {
      this.userService.getUserById(this.userId).subscribe(user => {
        let userData = user.payload.data()
        this.avatar = userData.avatar
        this.displayName = userData.displayName
        this.displayNameFige = this.displayName
        self.users = user
        
      })
    }
    )
  }

  save(){
    this.userService.updateUserDetail(this.userId,this.displayName,this.myPhoto)
  }


  logout(){
    this.userService.logout()
  }

  getImage(){
    const options:CameraOptions = {
      quality : 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum : false

    }

    this.camera.getPicture(options).then((imageData)=> {
      this.myPhoto ='data:image/jpeg;base64,'+ imageData
    })
  }


  takeImage(){
    const options:CameraOptions = {
      quality : 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType : this.camera.MediaType.PICTURE,
      correctOrientation : true
      //saveToPhotoAlbum : false

    }

    this.camera.getPicture(options).then((imageData)=> {
      this.myPhoto ='data:image/jpeg;base64,'+ imageData
    }, (err) => {

    })
  }


}
