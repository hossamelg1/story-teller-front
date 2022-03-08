import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-admin-s',
  templateUrl: './admin-s.component.html',
  styleUrls: ['./admin-s.component.css']
})
export class AdminSComponent implements OnInit {
  public listUsers: any;
  constructor(private authenticationService: AuthenticationService, private adminService: AdminService, private router: Router) {
    if (this.authenticationService.user.username && this.authenticationService.user.isAdmin === false) {
        this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe((data) => {
      this.listUsers = data;
      console.log(this.listUsers)
    });
  }
  public deleteButton(id) {
    if (confirm("Are you sure to delete this user",)) {
      this.adminService.deleteUser(id).subscribe(x => {
        console.log(id);
        this.router.navigateByUrl('/admin');
      })
    }
  }

}
