# Panergon

Panergon is a program for rendering user interfaces using ArtifactML, a flexible and modular schema for creating and modifying content without being constrained by a rigid structure. The project emphasizes modularity, extensibility, separation of concerns, interoperability, user-friendly interface, dynamic content, security, and ease of use.

## Installation

To install Panergon, simply download the code from the repository:

```sh
git clone https://github.com/dancxjo/panergon.git
```

Then install the dependencies using Deno:
```sh
deno install --allow-read --allow-net --unstable ./main.ts
```

## Usage
To render an application, simply provide the path to an XML file and the name of the desired plugin:

```sh
./main.ts ./path/to/application.xml plugin
```

Available plugins include cli for a command-line interface and gtk for a graphical user interface using the GTK toolkit.

### Flags
The following flags are available:

* `-h, --help`: Show the help message.
* `-V, --version`: Show the version number for this program.
### Options
The following options are available:

* `--config`: Path to the configuration file.
* `--lang`: Language to use for the interface.

## Plugins
Plugins are modules that provide rendering functionality for specific types of interfaces. The following plugins are currently available:

* cli: Renders the application as a command-line interface.
*gtk: Renders the application as a graphical user interface using the GTK toolkit.

## Contributing
Contributions to Panergon are welcome! If you find a bug, have an idea for a new feature, or just want to improve the code, feel free to submit an issue or pull request on the project's GitHub page.

### License
Panergon is licensed under the MIT License. See LICENSE for details.