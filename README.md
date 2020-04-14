# Генератор отличий
[![Maintainability](https://api.codeclimate.com/v1/badges/eb97f7c29b63b51baee0/maintainability)](https://codeclimate.com/github/Vasya231/frontend-project-lvl2/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/eb97f7c29b63b51baee0/test_coverage)](https://codeclimate.com/github/Vasya231/frontend-project-lvl2/test_coverage)
![CI](https://github.com/Vasya231/frontend-project-lvl2/workflows/CI/badge.svg)

## Установка:

    cd <project_dir>
    make build
    sudo npm link
    
  
<details>
  <summary>Asciinema</summary>
<a href="https://asciinema.org/a/IktojVObsbXQrjqx1yUw6lLZ6" target="_blank"><img src="https://asciinema.org/a/IktojVObsbXQrjqx1yUw6lLZ6.svg" /></a>
</details>

## Использование:

    gendiff [options] <firstConfig> <secondConfig>
    
Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format, valid formats: pretty, plain, json
                       (default: "pretty")
  -h, --help           display help for command


### Примеры использования:

<details>
<summary>Плоский json</summary>
<a href="https://asciinema.org/a/MXaI58gRJSPOSFDkIc050aSPz" target="_blank"><img src="https://asciinema.org/a/MXaI58gRJSPOSFDkIc050aSPz.svg" /></a>
</details>

<details>
<summary>Плоский yml</summary>
<a href="https://asciinema.org/a/asfF7btlEpYm4WRMzjH5sbKGK" target="_blank"><img src="https://asciinema.org/a/asfF7btlEpYm4WRMzjH5sbKGK.svg" /></a>
</details>

<details>
<summary>Плоский ini</summary>
<a href="https://asciinema.org/a/1X4RTIB5sGGxRAhOXqyhJKLOF" target="_blank"><img src="https://asciinema.org/a/1X4RTIB5sGGxRAhOXqyhJKLOF.svg" /></a>
</details>

<details>
<summary>JSON</summary>
<a href="https://asciinema.org/a/8sNlB1ppumotz26Y1uXiMNGgW" target="_blank"><img src="https://asciinema.org/a/8sNlB1ppumotz26Y1uXiMNGgW.svg" /></a>
</details>

<details>
<summary>Plain формат вывода</summary>
<a href="https://asciinema.org/a/PSRWsLI8KONsD9f3CBdeAI1FV" target="_blank"><img src="https://asciinema.org/a/PSRWsLI8KONsD9f3CBdeAI1FV.svg" /></a>
</details>

<details>
<summary>JSON формат вывода</summary>
<a href="https://asciinema.org/a/HnfHbgt2cI2i36GhNFJxUmhVg" target="_blank"><img src="https://asciinema.org/a/HnfHbgt2cI2i36GhNFJxUmhVg.svg" /></a>
</details>

### Dependencies:
https://github.com/tj/commander.js

https://github.com/isaacs/ini

https://github.com/nodeca/js-yaml

https://lodash.com/
