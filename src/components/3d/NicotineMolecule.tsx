import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Props {
  className?: string;
  interactive?: boolean;
}

export const NicotineMolecule: React.FC<Props> = ({ className = "w-full h-full", interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xdcebf7, 0.6);
    dirLight2.position.set(-6, -4, -3);
    scene.add(dirLight2);

    const rimLight = new THREE.PointLight(0x8cc63f, 1.0, 15);
    rimLight.position.set(0, 4, 3);
    scene.add(rimLight);

    const nitrogenMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x8cc63f,
      roughness: 0.25,
      metalness: 0.1,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2
    });

    const carbonMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x5b9a3c,
      roughness: 0.3,
      metalness: 0.1,
      clearcoat: 0.5,
      clearcoatRoughness: 0.25
    });

    const hydrogenMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf4f6ee,
      roughness: 0.35,
      metalness: 0.05,
      clearcoat: 0.4
    });

    const bondMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.1
    });

    const carbonGeo = new THREE.SphereGeometry(0.38, 24, 24);
    const nitrogenGeo = new THREE.SphereGeometry(0.42, 24, 24);
    const hydrogenGeo = new THREE.SphereGeometry(0.22, 16, 16);

    const atoms = [
      { pos: [-1.8, 1.2, 0.0], mat: nitrogenMaterial, geo: nitrogenGeo },
      { pos: [-0.6, 1.7, 0.1], mat: carbonMaterial, geo: carbonGeo },
      { pos: [0.5, 0.9, 0.1], mat: carbonMaterial, geo: carbonGeo },
      { pos: [0.4, -0.5, 0.0], mat: carbonMaterial, geo: carbonGeo },
      { pos: [-0.8, -1.0, -0.1], mat: carbonMaterial, geo: carbonGeo },
      { pos: [-1.9, -0.1, -0.1], mat: carbonMaterial, geo: carbonGeo },
      { pos: [1.7, 1.6, 0.3], mat: carbonMaterial, geo: carbonGeo },
      { pos: [2.9, 0.9, -0.3], mat: carbonMaterial, geo: carbonGeo },
      { pos: [2.6, -0.6, -0.2], mat: carbonMaterial, geo: carbonGeo },
      { pos: [1.2, -0.8, 0.3], mat: nitrogenMaterial, geo: nitrogenGeo },
      { pos: [0.8, -2.1, 0.7], mat: carbonMaterial, geo: carbonGeo },
      { pos: [-0.6, 2.7, 0.2], mat: hydrogenMaterial, geo: hydrogenGeo },
      { pos: [1.2, -1.2, -0.3], mat: hydrogenMaterial, geo: hydrogenGeo },
      { pos: [-1.0, -2.0, -0.2], mat: hydrogenMaterial, geo: hydrogenGeo },
      { pos: [-2.8, -0.4, -0.2], mat: hydrogenMaterial, geo: hydrogenGeo },
      { pos: [1.8, 2.5, -0.2], mat: hydrogenMaterial, geo: hydrogenGeo },
      { pos: [3.8, 1.3, -0.1], mat: hydrogenMaterial, geo: hydrogenGeo },
      { pos: [3.1, -1.2, -0.9], mat: hydrogenMaterial, geo: hydrogenGeo },
      { pos: [1.3, -2.8, 0.3], mat: hydrogenMaterial, geo: hydrogenGeo }
    ];

    const bonds: [number, number][] = [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
      [2, 6],
      [6, 7], [7, 8], [8, 9], [9, 6],
      [9, 10],
      [1, 11], [3, 12], [4, 13], [5, 14],
      [6, 15], [7, 16], [8, 17], [10, 18]
    ];

    atoms.forEach((a) => {
      const mesh = new THREE.Mesh(a.geo, a.mat);
      mesh.position.set(a.pos[0], a.pos[1], a.pos[2]);
      moleculeGroup.add(mesh);
    });

    const createBond = (v1: THREE.Vector3, v2: THREE.Vector3, radius = 0.08) => {
      const distance = v1.distanceTo(v2);
      const bondGeo = new THREE.CylinderGeometry(radius, radius, distance, 12);
      const bondMesh = new THREE.Mesh(bondGeo, bondMaterial);

      const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
      bondMesh.position.copy(mid);

      const orientation = new THREE.Matrix4();
      orientation.lookAt(v1, v2, new THREE.Vector3(0, 1, 0));
      orientation.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));
      bondMesh.setRotationFromMatrix(orientation);

      return bondMesh;
    };

    bonds.forEach(([i, j]) => {
      if (atoms[i] && atoms[j]) {
        const v1 = new THREE.Vector3(...atoms[i].pos);
        const v2 = new THREE.Vector3(...atoms[j].pos);
        const bondMesh = createBond(v1, v2);
        moleculeGroup.add(bondMesh);
      }
    });

    moleculeGroup.position.set(-0.3, 0, 0);

    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let targetRotationX = 0.2;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMousePos = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging && interactive) {
        const deltaX = clientX - prevMousePos.x;
        const deltaY = clientY - prevMousePos.y;

        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;

        prevMousePos = { x: clientX, y: clientY };
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handlePointerDown);
    domElement.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!isDragging) {
        targetRotationY += 0.0035;
        moleculeGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.15;
      }

      moleculeGroup.rotation.y += (targetRotationY + mouseX * 0.25 - moleculeGroup.rotation.y) * 0.05;
      moleculeGroup.rotation.x += (targetRotationX - mouseY * 0.25 - moleculeGroup.rotation.x) * 0.05;
      moleculeGroup.rotation.z = Math.sin(elapsedTime * 0.7) * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', handlePointerDown);
      domElement.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);

      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [interactive]);

  return (
    <div className={`relative flex items-center justify-center cursor-grab active:cursor-grabbing ${className}`}>
      <div ref={containerRef} className="w-full h-full min-h-[360px] md:min-h-[440px]" />
    </div>
  );
};
