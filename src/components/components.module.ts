import { NgModule } from '@angular/core';

import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';

import { SpListComponent } from './sp-list/sp-list';
import { SllwListComponent } from './sllw-list/sllw-list';
import { KwListComponent } from './kw-list/kw-list';
import { CcListComponent } from './cc-list/cc-list';
import { C4ListComponent } from './c4-list/c4-list';
import { EwListComponent } from './ew-list/ew-list';

@NgModule({
	declarations: [
		SpListComponent,
		SllwListComponent,
		KwListComponent,
		CcListComponent,
		C4ListComponent,
		EwListComponent
	],
	imports: [
		CommonModule, // <--- for angular directives
		IonicModule  // <--- for ionic components
	],
	exports: [
		SpListComponent,
		SllwListComponent,
		KwListComponent,
		CcListComponent,
		C4ListComponent,
		EwListComponent
	]
})
export class ComponentsModule {}
