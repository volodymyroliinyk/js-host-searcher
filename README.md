# js-host-searcher

Searching domains used n web page

#### How to use:

1) Put code to Web browser console and run.
2) As result visible domains coma list.
   `
   class HostSearcher
   {
   ...
   }
   var hostSearcher = new HostSearcher();
   console.log('');
   console.log('[[[ HOST SEARCHER ALL::  START ]]]');
   console.log('');
   console.log('Total: ', hostSearcher.getUniqueHosts().length);
   console.log('');
   console.log(hostSearcher.getUniqueHostsWithComa());
   console.log('');
   console.log('[[[ HOST SEARCHER ALL ::  END ]]]');
   `

