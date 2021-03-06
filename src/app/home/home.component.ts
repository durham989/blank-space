import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import anime, { random } from 'animejs';
import * as $ from 'jquery';
import * as THREE from 'three';
import * as scrollMonitor from 'scrollmonitor';

import { AppState } from '../app.service';
import { Title } from './title';
import { ScrollService } from '../services/scroll.service';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'home',
  providers: [
    Title
  ],
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
  public localState = { value: '' };
  public titleAnimation: any;
  public backgroundAnimation: any;
  public DOM: any;
  public contentElemsTotal: any;
  public shapes: any;
  public step: any;
  public svgWidth: any = window.screen.width;
  public svgHeight: any = window.screen.height;
  public newWidth: any;
  public newHeight: any;
  public formStep: any = 1;
  public contactForm: FormGroup;
  public contactFormSubmitted: Boolean = false;
  public contactSubmissionResults: any = [];

  @ViewChild('blankSpace') blankSpaceElement: ElementRef;
  @ViewChild('backgroundSVG') backgroundSVGElement: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.newHeight = window.screen.height;
    this.newWidth = window.screen.width;
    
    this.svgWidth = this.newWidth;
    this.svgHeight = this.newHeight;
  }

  constructor(
    public appState: AppState,
    public title: Title,
    private scrollService: ScrollService,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
  ) {
    this.buildForms();
  }

  public ngOnInit() {
    console.log('hello `Home` component');
    this.newHeight = window.screen.height;
    this.newWidth = window.screen.width;
    this.brandingAnimation();
    // this.animateBackground();
    this.configureDOM();
    this.initializeMorphing();
    this.createScrollWatchers();
  }

  buildForms() {
    this.contactForm = this.formBuilder.group({
      name: [null, Validators.required],
      organization: [null, Validators.required],
      emailAddress: [null, Validators.required],
      areaOfInterest: [null, Validators.required],
      message: [null, Validators.required]
    });
  }

  brandingAnimation() {
    // Blank Space branding animation
    $('.blank-space-branding').each(function () {
      $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });
    anime.timeline({ loop: false })
      .add({
        targets: '.blank-space-branding .letter',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: function (el, i) {
          return 150 * (i + 1)
        }
      });

    // "Creative" branding subtitle animation
    $('.blank-space-subheader').each(function () {
      $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });
    anime.timeline({ loop: false })
      .add({
        targets: '.blank-space-subheader .letter',
        direction: 'reverse',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: function (el, i) {
          return 150 * (i + 1)
        }
      });

    // Services text animation
    $('.blank-space-service-header').each(function () {
      $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });
    anime.timeline({ loop: false })
      .add({
        targets: '.blank-space-service-header .letter',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: function (el, i) {
          return 150 * (i + 1)
        }
      });
  }

  animateBackground() {
    this.backgroundAnimation = anime.timeline({ loop: false })
      .add({
        targets: '.home-background',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: function (el, i) {
          return 150 * (i + 1)
        }
      });
    return this.backgroundAnimation;
  }

  initializeMorphing() {
    this.initShapeEl();
    // this.createScrollWatchers();
  }

  extend(a, b) {
		for( let key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
  };
  
  getMousePos(ev) {
		let posx = 0;
		let posy = 0;
		if (!ev) ev = window.event;
		if (ev.pageX || ev.pageY) 	{
			posx = ev.pageX;
			posy = ev.pageY;
		}
		else if (ev.clientX || ev.clientY) 	{
			posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return { x : posx, y : posy };
  };
  
  configureDOM() {
    this.DOM = {};
    this.DOM.svg = document.querySelector('.morph');
    this.DOM.shapeEl = this.DOM.svg.querySelector('path');
    this.DOM.contentElems = Array.from(document.querySelectorAll('.container-flex'));
    this.DOM.footer = document.querySelector('i');
    this.contentElemsTotal = this.DOM.contentElems.length;
    this.shapes = [
      {
        path: 'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
        pathAlt: 'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
        scaleX: 2.4,
        scaleY: 2.2,
        rotate: 0,
        tx: -30,
        ty: -300,
        fill: {
          color: '#EDFAFC',
          duration: 500,
          easing: 'linear'
        },
        animation: {
          path: {
            duration: 3000,
            easing: 'easeOutElastic',
            elasticity: 600
          },
          svg: {
            duration: 2000,
            easing: 'easeOutElastic'
          }
        }
      },
      {
        path: 'M 415.6,206.3 C 407.4,286.6 438.1,373.6 496.2,454.8 554.3,536.1 497,597.2 579.7,685.7 662.4,774.1 834.3,731.7 898.5,653.4 962.3,575 967.1,486 937.7,370 909.3,253.9 937.7,201.5 833.4,105.4 729.3,9.338 602.2,13.73 530.6,41.91 459,70.08 423.9,126.1 415.6,206.3 Z',
        pathAlt: 'M 415.6,206.3 C 407.4,286.6 415.5,381.7 473.6,462.9 531.7,544.2 482.5,637.6 579.7,685.7 676.9,733.8 826.2,710.7 890.4,632.4 954.2,554 926.8,487.6 937.7,370 948.6,252.4 937.7,201.5 833.4,105.4 729.3,9.338 602.2,13.73 530.6,41.91 459,70.08 423.9,126.1 415.6,206.3 Z',
        // path: 'M0,0H800s-42,170,379,170,420.5,226.26,420.5,226.26L1600,1000H0Z',
        // pathAlt: 'M0,0H800s-42,170,379,170,420.5,226.26,420.5,226.26L1600,1000H0Z',
        scaleX: 3.1,
        scaleY: 1.9,
        rotate: 0,
        tx: 0,
        ty: -100,
        fill: {
          color: '#EDFAFC',
          duration: 500,
          easing: 'linear'
        },
        animation: {
          path: {
            duration: 2000,
            easing: 'easeOutElastic',
            elasticity: 600
          },
          svg: {
            duration: 2000,
            easing: 'easeOutElastic'
          }
        }
      },
      {
        path: 'M 383.8,163.4 C 335.8,352.3 591.6,317.1 608.7,420.8 625.8,524.5 580.5,626 647.3,688 714,750 837.1,760.5 940.9,661.5 1044,562.3 1041,455.8 975.8,393.6 909.8,331.5 854.2,365.4 784.4,328.1 714.6,290.8 771.9,245.2 733.1,132.4 694.2,19.52 431.9,-25.48 383.8,163.4 Z',
        pathAlt: 'M 383.8,163.4 C 345.5,324.9 591.6,317.1 608.7,420.8 625.8,524.5 595.1,597 647.3,688 699.5,779 837.1,760.5 940.9,661.5 1044,562.3 1068,444.4 975.8,393.6 884,342.8 854.2,365.4 784.4,328.1 714.6,290.8 820.3,237.2 733.1,132.4 645.9,27.62 422.1,1.919 383.8,163.4 Z',
        scaleX: 3.4,
        scaleY: 3.1,
        rotate: -20,
        tx: 200,
        ty: 200,
        fill: {
          color: '#EDFAFC',
          duration: 500,
          easing: 'linear'
        },
        animation: {
          path: {
            duration: 3000,
            easing: 'easeOutElastic',
            elasticity: 600
          },
          svg: {
            duration: 2500,
            easing: 'easeOutElastic'
          }
        }
      },
      {
        path: 'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
        pathAlt: 'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
        scaleX: 3.0,
        scaleY: 2.0,
        rotate: -20,
        tx: 0,
        ty: -50,
        fill: {
          color: '#EDFAFC',
          duration: 500,
          easing: 'linear'
        },
        animation: {
          path: {
            duration: 3000,
            easing: 'easeOutQuad',
            elasticity: 600
          },
          svg: {
            duration: 3000,
            easing: 'easeOutElastic'
          }
        }
      },
      // {
      //   path: 'M 247.6,239.6 C 174.3,404.5 245.5,601.9 358.5,624.3 471.5,646.6 569.1,611.6 659.7,655.7 750.4,699.7 1068,687.6 1153,534.4 1237,381.1 1114,328.4 1127,227.4 1140,126.3 1016,51.08 924.6,116.8 833.8,182.5 928.4,393.8 706.8,283.5 485.2,173.1 320.8,74.68 247.6,239.6 Z',
      //   pathAlt: 'M 247.6,239.6 C 174.3,404.5 271.3,550.3 358.5,624.3 445.7,698.3 569.1,611.6 659.7,655.7 750.4,699.7 1145,699 1153,534.4 1161,369.8 1114,328.4 1127,227.4 1140,126.3 1016,51.08 924.6,116.8 833.8,182.5 894.5,431 706.8,283.5 519.1,136 320.8,74.68 247.6,239.6 Z',
      //   scaleX: 2.5,
      //   scaleY: 2.5,
      //   rotate: 0,
      //   tx: 250,
      //   ty: 50,
      //   fill: {
      //     color: '#EDFAFC',
      //     duration: 500,
      //     easing: 'linear'
      //   },
      //   animation: {
      //     path: {
      //       duration: 3000,
      //       easing: 'easeOutElastic',
      //       elasticity: 600
      //     },
      //     svg: {
      //       duration: 2000,
      //       easing: 'easeOutExpo'
      //     }
      //   }
      // },
      {
        path: 'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
        pathAlt: 'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
        scaleX: 1.8,
        scaleY: 2.0,
        rotate: -20,
        tx: 0,
        ty: -50,
        fill: {
          color: '#EDFAFC',
          duration: 500,
          easing: 'linear'
        },
        animation: {
          path: {
            duration: 3000,
            easing: 'easeOutQuad',
            elasticity: 600
          },
          svg: {
            duration: 3000,
            easing: 'easeOutElastic'
          }
        }
      },
      // footer shape:
      {
        path: 'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
        pathAlt: 'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
        scaleX: 2.5,
        scaleY: 2,
        rotate: 0,
        tx: 0,
        ty: -50,
        fill: {
          color: '#EDFAFC',
          duration: 500,
          easing: 'linear'
        },
        animation: {
          path: {
            duration: 3000,
            easing: 'easeOutQuad',
            elasticity: 600
          },
          svg: {
            duration: 3000,
            easing: 'easeOutElastic'
          }
        }
      },
      {
        path: 'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
        pathAlt: 'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
        scaleX: 2.4,
        scaleY: 2.2,
        rotate: 0,
        tx: -30,
        ty: -300,
        fill: {
          color: '#EDFAFC',
          duration: 500,
          easing: 'linear'
        },
        animation: {
          path: {
            duration: 3000,
            easing: 'easeOutElastic',
            elasticity: 600
          },
          svg: {
            duration: 2000,
            easing: 'easeOutElastic'
          }
        }
      },
    ];
  }

  initShapeLoop(pos?) {
		var pos = pos || 0;
		anime.remove(this.DOM.shapeEl);
		anime({
			targets: this.DOM.shapeEl,
			easing: 'linear',
			d: [{value: this.shapes[pos].pathAlt, duration:3500}, {value: this.shapes[pos].path, duration:3500}],
			loop: true,
			fill: {
				value: this.shapes[pos].fill.color,
				duration: this.shapes[pos].fill.duration,
				easing: this.shapes[pos].fill.easing
			},
			direction: 'alternate'
		});
  };
  
	initShapeEl() {
		anime.remove(this.DOM.svg);
		anime({
			targets: this.DOM.svg,
			duration: 1,
			easing: 'linear',
			scaleX: this.shapes[0].scaleX,
			scaleY: this.shapes[0].scaleY,
			translateX: this.shapes[0].tx+'px',
			translateY: this.shapes[0].ty+'px',
			rotate: this.shapes[0].rotate+'deg'
		});

		this.initShapeLoop();
  };
  
  createScrollWatchers() {
		this.DOM.contentElems.forEach((el,pos) => {
      const scrollElemToWatch = pos ? this.DOM.contentElems[pos] : this.DOM.footer;
      pos = pos ? pos : this.contentElemsTotal;
      const watcher = scrollMonitor.create(scrollElemToWatch,-300);
      const svg = document.querySelector('.morph');
      const shapeEl = svg.querySelector('path');
      const shapes = this.shapes;
			
			watcher.enterViewport(function() {
        this.step = pos;
        console.log('entered viewport');
        console.log(this.step);
				anime.remove(shapeEl);
				anime({
					targets: shapeEl,
					duration: shapes[pos].animation.path.duration,
					easing: shapes[pos].animation.path.easing,
					elasticity: shapes[pos].animation.path.elasticity || 0,
					d: shapes[pos].path,
					fill: {
						value: shapes[pos].fill.color,
						duration: shapes[pos].fill.duration,
						easing: shapes[pos].fill.easing
					},
					complete: function() {
            anime.remove(shapeEl);
            anime({
              targets: shapeEl,
              easing: 'linear',
              d: [{value: shapes[pos].pathAlt, duration:3500}, {value: shapes[pos].path, duration:3500}],
              loop: true,
              fill: {
                value: shapes[pos].fill.color,
                duration: shapes[pos].fill.duration,
                easing: shapes[pos].fill.easing
              },
              direction: 'alternate'
            });
					}
				});

				anime.remove(svg);
				anime({
					targets: svg,
					duration: shapes[pos].animation.svg.duration,
					easing: shapes[pos].animation.svg.easing,
					elasticity: shapes[pos].animation.svg.elasticity || 0,
					scaleX: shapes[pos].scaleX,
					scaleY: shapes[pos].scaleY,
					translateX: shapes[pos].tx+'px',
					translateY: shapes[pos].ty+'px',
					rotate: shapes[pos].rotate+'deg'
				});
			});

			watcher.exitViewport(function() {
        const idx = !watcher.isAboveViewport ? pos-1 : pos+1;

				if( idx <= this.contentElemsTotal && this.step !== idx ) {
					this.step = idx;
					anime.remove(shapeEl);
					anime({
						targets: shapeEl,
						duration: shapes[idx].animation.path.duration,
						easing: shapes[idx].animation.path.easing,
						elasticity: shapes[idx].animation.path.elasticity || 0,
						d: shapes[idx].path,
						fill: {
							value: shapes[idx].fill.color,
							duration: shapes[idx].fill.duration,
							easing: shapes[idx].fill.easing
						},
						complete: function() {
              anime.remove(shapeEl);
              anime({
                targets: shapeEl,
                easing: 'linear',
                d: [{value: shapes[pos].pathAlt, duration:3500}, {value: shapes[pos].path, duration:3500}],
                loop: true,
                fill: {
                  value: shapes[pos].fill.color,
                  duration: shapes[pos].fill.duration,
                  easing: shapes[pos].fill.easing
                },
                direction: 'alternate'
              });
						}
					});

					anime.remove(svg);
					anime({
						targets: svg,
						duration: shapes[idx].animation.svg.duration,
						easing: shapes[idx].animation.svg.easing,
						elasticity: shapes[idx].animation.svg.elasticity || 0,
						scaleX: shapes[idx].scaleX,
						scaleY: shapes[idx].scaleY,
						translateX: shapes[idx].tx+'px',
						translateY: shapes[idx].ty+'px',
						rotate: shapes[idx].rotate+'deg'
					});
				}
			});
		});
  }

  scrollToSection(section) {
    console.log('scroll to: ' + section);
    this.scrollService.triggerToScroll(section);
  }

  moveToNextFormStep(step) {
    this.formStep = step;
    console.log('formStep is: ' + this.formStep);
  }

  onInputEnter(field,value,step) {
    switch (field) {
      case 'name': 
        this.contactForm.patchValue({
          name: value
        });
        this.formStep = step;
        break;
      case 'organization': 
        this.contactForm.patchValue({
          organization: value
        });
        this.formStep = step;
        break;
      case 'emailAddress': 
        this.contactForm.patchValue({
          emailAddress: value
        });
        this.formStep = step;
        break;
      case 'areaOfInterest': 
        this.contactForm.patchValue({
          areaOfInterest: value
        });
        this.formStep = step;
        break;
      case 'message': 
        this.contactForm.patchValue({
          message: value
        });
        this.submitContactForm();
        break;
    }
  }

  submitContactForm() {
    this.contactFormSubmitted = true;
    this.contactService.submitContactForm(this.contactForm.value).subscribe(
      data => {
        this.contactSubmissionResults = data;
        console.log('data is: ' + JSON.stringify(this.contactSubmissionResults));
      },
      error => {
        console.error(error);
        console.log(error.error.message);
      }
    );
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
