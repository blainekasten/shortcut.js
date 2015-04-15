
/*
 * Takes EventData and returns a character string
 *
 * @params {Event}
 * @returns {String}
 */

export default function(e){
  var OS_MOD_KEY_NAME = /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl',
      OS_MAP = {},
      character;

  OS_MAP[OS_MOD_KEY_NAME] = 'mod';

  switch(e.keyCode){
    case 224: //firefox meta
      character = 'meta';
      break;
    case 91:
      character = 'meta';
      break;
    case 16:
      character = 'shift';
      break;
    case 18:
      character = 'optn';
      break;
    case 17:
      character = 'ctrl';
      break;
    case 32:
      character = 'space';
      break;
    case 40:
      character = 'down';
      break;
    case 39:
      character = 'right';
      break;
    case 38:
      character = 'up';
      break;
    case 37:
      character = 'left';
      break;
    case 9:
      character = 'tab';
      break;
    case 13:
      character = 'rtn';
      break;
  }

  if (OS_MAP[character]) {
    character = OS_MAP[character];
  }

  if (!character) {
    character = String.fromCharCode(e.keyCode || e.charCode).toLowerCase();
  }
  return character;
}
