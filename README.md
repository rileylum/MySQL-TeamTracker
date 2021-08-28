# MySQL Team Tracker

  ![License Badge](https://img.shields.io/badge/license-ISC-blue)

  ## Description

  A simple content management system to view and manage a team stored in a MySQL Database. Using NodeJS, Inquirer and MySQL to build a simple CLI for use.

  ## Table of Contents

  1.[Installation Instructions](#installation-instructions)

  2.[Usage Instructions](#usage-instructions)

  3.[Contribution Instructions](#contribution-instructions)

  4.[Questions](#questions)

  5.[License](#License)
  

  ## Installation Instructions

    npm install

  ## Usage Instructions

  To use the application you will need to have mysql installed locally, instructions can be found here: https://www.mysql.com/

  Rename .env.EXAMPLE to .env and fill in the appropriate settings for your mysql environment.

  Run the schema and optionally the seed files to set up the database:

    mysql -u YOUR_USERNAME -p
    SOURCE db/schema.sql
    SOURCE db/seed.sql

  Once the above set up is done run the following code to begin!

    node index

  Here is a link to a video demonstration of the application: [VIDEO](https://drive.google.com/file/d/1prmaV7jtX6JllIKJCqErFDnE-h-Qudxq/view?usp=sharing)
  ## Contribution Instructions

  I am not actively maintaining this project. Please feel free to fork and make any changes.

  ## Questions
  
  For any questions regarding the project please reach out to me on Github: [Github](https://github.com/rileylum) or via Email: rileylum@adam.com.au

  ## License

  
ISC License

Copyright (c) 2021, Riley Lum

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
        

