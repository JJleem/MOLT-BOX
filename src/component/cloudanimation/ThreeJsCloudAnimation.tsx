import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import purple from "../../assets/ThreeJsCloudAnimationAssets/purplecloud.png";
import smoke from "../../assets/ThreeJsCloudAnimationAssets/smoke-1.png";

const CloudAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const canvasElement = canvasRef.current;

    if (!canvasElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(canvasElement);

    return () => {
      observer.unobserve(canvasElement);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const width = 960;
    const height = 919;
    const cloudParticles: THREE.Mesh[] = [];
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    if (canvasRef.current) {
      canvasRef.current.innerHTML = ""; // 기존 DOM 요소 초기화
      canvasRef.current.appendChild(renderer.domElement);
    }

    const clearScene = () => {
      cloudParticles.forEach((particle) => {
        scene.remove(particle);
      });
      cloudParticles.length = 0; // 배열 초기화
    };
    //////////////////////

    //////////////////
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    scene.fog = new THREE.FogExp2(0x0a001f, 0.002);
    renderer.setClearColor(0x0a001f);
    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement);
    }

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.5;

    const ambient = new THREE.AmbientLight(0x555555, 1.2);
    scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffeedd, 1.5);
    directional.position.set(0, 0, 1);
    scene.add(directional);

    const point = new THREE.PointLight(0x062d89, 50, 500, 1.7);
    point.position.set(200, 300, 100);
    scene.add(point);

    const loadertwo = new THREE.TextureLoader();
    loadertwo.load(
      `${smoke}`,
      (texture: THREE.Texture) => {
        const cloudGeometry = new THREE.PlaneGeometry(1500, 800);
        const cloudMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true,
          color: new THREE.Color(0x6f36ff),
          emissive: new THREE.Color(0x6f36ff),
          emissiveIntensity: 0.03,
          alphaTest: 0.1,
          depthWrite: false,
        });

        for (let i = 0; i < 15; i++) {
          const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
          cloud.position.set(
            Math.random() * 1200 - 600,
            800,
            Math.random() * 800 - 40
          );
          cloud.rotation.x = 1.16;
          cloud.rotation.y = -0.01;
          cloud.rotation.z = Math.random() * 200;
          cloud.material.opacity = 0.3;
          cloudParticles.push(cloud);
          scene.add(cloud);
        }
      },
      undefined,
      (error: unknown) => {
        console.error("Error loading texture:", error);
      }
    );

    const loader = new THREE.TextureLoader();
    loader.load(
      `${purple}`,
      (texture: THREE.Texture) => {
        const cloudGeometry = new THREE.PlaneGeometry(1000, 800);
        const cloudMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true,
          color: new THREE.Color(0x6f36ff),
          emissive: new THREE.Color(0x6f36ff),
          emissiveIntensity: 1,
          alphaTest: 0.1,
          depthWrite: false,
        });

        for (let i = 0; i < 15; i++) {
          const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
          cloud.position.set(
            Math.random() * 1200 - 600,
            1000,
            Math.random() * 800 - 40
          );
          cloud.rotation.x = 1.16;
          cloud.rotation.y = -0.12;
          cloud.rotation.z = Math.random() * 360;
          cloud.material.opacity = 1;
          cloudParticles.push(cloud);
          scene.add(cloud);
        }
      },
      (progress: ProgressEvent<EventTarget>) => {
        // 로딩 상태 표시
        console.log(
          `Loaded image: ${(progress.loaded / progress.total) * 100}%`
        );
      },
      (error: unknown) => {
        // 오류 처리 개선
        console.error("Error loading texture:", error);
        // 대체 이미지 사용 등의 처리 추가
      }
    );

    const rainGeometry = new THREE.BufferGeometry();
    const rainCount = 2000;
    const rainPositions = new Float32Array(rainCount * 3);

    for (let i = 0; i < rainCount; i++) {
      rainPositions[i * 3] = Math.random() * 400 - 200;
      rainPositions[i * 3 + 1] = Math.random() * 500 - 250;
      rainPositions[i * 3 + 2] = Math.random() * 400 - 200;
    }

    rainGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(rainPositions, 3)
    );

    const rainMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.3,
      transparent: false,
    });

    const rain = new THREE.Points(rainGeometry, rainMaterial);
    scene.add(rain);

    const fps = 30;

    const render = () => {
      if (!isVisible) return;
      cloudParticles.forEach((cloud) => {
        const mesh = cloud as THREE.Mesh<
          THREE.PlaneGeometry,
          THREE.MeshLambertMaterial
        >;
        mesh.rotation.z -= 0.002;
        mesh.material.opacity = 0.7;
      });
      rainGeometry.attributes.position.needsUpdate = false;
      for (let i = 0; i < rainGeometry.attributes.position.count; i++) {
        rainPositions[i * 3 + 1] -= 0.1 + Math.random() * 0.1;
        if (rainPositions[i * 3 + 1] < -200) {
          rainPositions[i * 3 + 1] = 200;
        }
        rainGeometry.attributes.position.needsUpdate = true;
      }

      rain.rotation.y += 0.001;

      if (Math.random() > 0.98 || point.power > 100) {
        if (point.power < 100)
          point.position.set(
            Math.random() * 400,
            300 + Math.random() * 200,
            100
          );
        point.power = 50 + Math.random() * 500;
      }

      renderer.render(scene, camera);
      setTimeout(() => {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }, 1000 / fps);
    };

    render();

    const onResize = () => {
      if (renderer && camera) {
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      renderer.dispose();
      window.removeEventListener("resize", onResize);
      clearScene();
    };
  }, [isVisible]);
  const renderCanvas = () => {
    return <div ref={canvasRef} id="cloud"></div>;
  };

  return renderCanvas();
};

export default CloudAnimation;
