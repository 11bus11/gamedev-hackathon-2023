/**
 * Generic die animation. Target sprite shrinks and fades
 * @param {Scene} scene - The host scene
 * @param {Sprite} target - The sprite target
 * @param {Function} onComplete - Callback function called when animation completes
 * @returns 
 */
export function dieTween(scene, target, onComplete) {
    return (scene.tweens.add({
        targets: target,
        alpha: 0.3,
        scaleX: 0.5 * Math.sign(target.scaleX),
        scaleY: 0.5,
        ease: 'linear',
        duration: 200,
        onComplete
    }));
}

/**
 * Time crystal pickup animation. Target jumps up and increases in size while fading out.
 * @param {Scene} scene - The host scene
 * @param {Sprite} target - The sprite target
 * @param {Function} onComplete - Callback function called when animation completes
 * @returns 
 */
export function crystalTween(scene, target, onComplete) {
    return (scene.tweens.add({
        targets: target,
        alpha: 0.3,
        y: target.y - 50,
        scaleX: 1.5 * Math.sign(target.scaleX),
        scaleY: 1.5,
        ease: 'linear',
        duration: 200,
        onComplete
    }));
}
