import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

const port = 36501;

final InAppLocalhostServer localhostServer =
    InAppLocalhostServer(documentRoot: './assets/web', port: port);

Future main() async {
  WidgetsFlutterBinding.ensureInitialized();

  if (!kIsWeb) {
    // start the localhost server
    await localhostServer.start();
  }

  if (!kIsWeb && defaultTargetPlatform == TargetPlatform.android) {
    await InAppWebViewController.setWebContentsDebuggingEnabled(kDebugMode);
  }

  runApp(const MaterialApp(home: MyApp()));
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   title: const Text('InAppLocalhostServer Example'),
      // ),
      body: Column(children: <Widget>[
        Expanded(
          child: InAppWebView(
            initialSettings: InAppWebViewSettings(
              isInspectable: kDebugMode,
            ),
            initialUrlRequest:
                URLRequest(url: WebUri('http://localhost:$port')),
            onWebViewCreated: (controller) {},
            onLoadStart: (controller, url) {},
            onLoadStop: (controller, url) {},
          ),
        )
      ]),
    );
  }
}
