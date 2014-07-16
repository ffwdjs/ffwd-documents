# ffwd-documents


## Installation

```bash

```

```mysql
CREATE USER 'ffwd_documents'@'localhost' IDENTIFIED BY  '***';

GRANT USAGE ON * . * TO  'ffwd_documents'@'localhost' IDENTIFIED BY  '***' WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0 ;

GRANT ALL PRIVILEGES ON  `ffwd_documents\_%` . * TO  'ffwd_documents'@'localhost';
```