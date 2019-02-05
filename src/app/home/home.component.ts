import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import anime from 'animejs';
import * as $ from 'jquery';
import * as THREE from 'three';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';

@Component({
  selector: 'home',
  providers: [
    Title
  ],
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
  animations: [
    // animation triggers go here
  ]
})

export class HomeComponent implements OnInit {
  public localState = { value: '' };
  public titleAnimation: any;
  public backgroundAnimation: any;
  public canvas: any;
  public dots: any;
  public positions: any;
  public renderer: any;
  public width: any;
  public height: any;
  public camera: any;
  public scene: any;
  public mouse: any;

  @ViewChild('blankSpace') blankSpaceElement: ElementRef;

  constructor(
    public appState: AppState,
    public title: Title
  ) { }

  public ngOnInit() {
    console.log('hello `Home` component');
    this.brandingAnimation();
    this.animateBackground();
  }

  ngAfterViewInit() {
    // 
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

  // animate() {
  //   this.canvas = document.querySelector('#scene');
  //   this.width = this.canvas.offsetWidth;
  //   this.height = this.canvas.offsetHeight;

  //   this.renderer = new THREE.WebGLRenderer({
  //     canvas: this.canvas,
  //     antialias: true
  //   });
  //   this.renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  //   this.renderer.setSize(this.width, this.height);
  //   this.renderer.setClearColor(0x59c384);

  //   this.scene = new THREE.Scene();

  //   this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 0.1, 2000);
  //   this.camera.position.set(0, 0, 80);

  //   var loader = new THREE.TextureLoader();
  //   loader.crossOrigin = "Anonymous";
  //   var dotTexture = loader.load('img/dotTexture.png');

  //   var radius = 50;
  //   var sphereGeom = new THREE.IcosahedronGeometry(radius, 5);
  //   var dotsGeom = new THREE.Geometry();
  //   var bufferDotsGeom = new THREE.BufferGeometry();
  //   this.positions = new Float32Array(sphereGeom.vertices.length * 3);
  //   for (var i = 0; i < sphereGeom.vertices.length; i++) {
  //     var vector = sphereGeom.vertices[i];
  //     this.animateDot(i, vector);
  //     dotsGeom.vertices.push(vector);
  //     vector.toArray(this.positions, i * 3);
  //   }

  //   var attributePositions = new THREE.BufferAttribute(this.positions, 3);
  //   bufferDotsGeom.addAttribute('position', attributePositions);
  //   var shaderMaterial = new THREE.ShaderMaterial({
  //     uniforms: {
  //       texture: {
  //         value: dotTexture
  //       }
  //     },
  //     vertexShader: document.getElementById("wrapVertexShader").textContent,
  //     fragmentShader: document.getElementById("wrapFragmentShader").textContent,
  //     transparent: true
  //   });
  //   var dots = new THREE.Points(bufferDotsGeom, shaderMaterial);
  //   this.scene.add(dots);

  //   this.mouse = new THREE.Vector2(0.8, 0.5);
  //   function onMouseMove(e) {
  //     this.mouse.x = (e.clientX / window.innerWidth) - 0.5;
  //     this.mouse.y = (e.clientY / window.innerHeight) - 0.5;
  //     TweenMax.to(dots.rotation, 4, {
  //       x: (this.mouse.y * Math.PI * 0.5),
  //       z: (this.mouse.x * Math.PI * 0.2),
  //       ease: Power1.easeOut
  //     });
  //   }

  //   window.addEventListener("mousemove", onMouseMove);
  //   var resizeTm;
  //   window.addEventListener("resize", function () {
  //     resizeTm = clearTimeout(resizeTm);
  //     resizeTm = setTimeout(this.onResize(), 200);
  //   });
  // }

  // animateDot(index, vector) {
  //   TweenMax.to(vector, 4, {
  //     x: 0,
  //     z: 0,
  //     ease: Back.easeOut,
  //     delay: Math.abs(vector.y / radius) * 2,
  //     repeat: -1,
  //     yoyo: true,
  //     yoyoEase: Back.easeOut,
  //     onUpdate: function () {
  //       this.updateDot(index, vector);
  //     }
  //   });
  // }

  // updateDot(index, vector) {
  //   this.positions[index * 3] = vector.x;
  //   this.positions[index * 3 + 2] = vector.z;
  // }

  // onResize() {
  //   this.canvas.style.width = '';
  //   this.canvas.style.height = '';
  //   this.width = this.canvas.offsetWidth;
  //   this.height = this.canvas.offsetHeight;
  //   this.camera.aspect = this.width / this.height;
  //   this.camera.updateProjectionMatrix();
  //   this.renderer.setSize(this.width, this.height);
  // }

  // render(a) {
  //   this.dots.geometry.verticesNeedUpdate = true;
  //   this.dots.geometry.attributes.position.needsUpdate = true;
  //   this.renderer.render(this.scene, this.camera);
  // }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
