package com.ssafy.common.util.jsch;

import com.jcraft.jsch.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class SSHUtil {

    // 싱글턴 패턴 사용
    private static SSHUtil instance = new SSHUtil();

    private SSHUtil(){}

    public static SSHUtil getInstance() {
        return instance;
    }

    private static final String REMOTE_HOST = "localhost";
    private static final String USERNAME = "ubuntu";
    private static final int REMOTE_PORT = 22;
    private static final int SESSION_TIMEOUT = 10000;
    private static final int CHANNEL_TIMEOUT = 5000;

    public static Session sessionConnect() {
        Session jschSession = null;
        try {
            JSch jsch = new JSch();
            jschSession = jsch.getSession(USERNAME, REMOTE_HOST, REMOTE_PORT);

            // not recommend, please use jsch.setKnownHosts, security concern
            jschSession.setConfig("StrictHostKeyChecking", "no");

            // authenticate using private key
            // jsch.addIdentity("J7E204T.pem");

            // 10 seconds session timeout
            jschSession.connect(SESSION_TIMEOUT);
        } catch (JSchException e) {
            e.printStackTrace();
        }
        return jschSession;
    }

    public static void sessionDisconnect(Session jschSession) {
        if (jschSession != null) {
            jschSession.disconnect();
        }
    }

    // localFile : EC2에 저장할 파일 명 및 경로, remoteFile : 하둡 클러스터에 저장할 파일 명 및 경로,
    // isDownload : 업로드(0) / 다운로드(1)
    public static void fileTransfer(Session jschSession, String localFile, String remoteFile, boolean isDownload) {

        try {

            JSch jsch = new JSch();

            Channel sftp = jschSession.openChannel("sftp");

            // 5 seconds timeout
            sftp.connect(CHANNEL_TIMEOUT);

            ChannelSftp channelSftp = (ChannelSftp) sftp;

            if (isDownload) {
                // download file from remote server to local
                channelSftp.get(remoteFile, localFile);
            } else {
                // transfer file from local to remote server
                channelSftp.put(localFile, remoteFile);
            }
            channelSftp.exit();

        } catch (JSchException | SftpException e) {
            e.printStackTrace();
        }
    }

    public static String cmd(Session jschSession, String script) {
        StringBuilder response = new StringBuilder();
        try {
            ByteArrayOutputStream outputBuffer = new ByteArrayOutputStream();

            ChannelExec channelExec = (ChannelExec) jschSession.openChannel("exec");

            channelExec.setCommand(script);
            InputStream inputStream = channelExec.getInputStream();
            channelExec.connect();

            byte[] buffer = new byte[8192];
            while (true) {
                while (inputStream.available() > 0) {
                    int i = inputStream.read(buffer, 0, 1024);
                    if (i < 0) break;
                    outputBuffer.write(buffer, 0, i);
                }
                if (channelExec.isClosed()) {
                    if (inputStream.available() > 0) continue;
//                    System.out.println("exit-status: " + channelExec.getExitStatus());
                    break;
                }
            }
            return outputBuffer.toString("UTF-8");

//            int decodedLength;
//            while ((decodedLength = inputStream.read(buffer, 0, buffer.length)) > 0)
//                response.append(new String(buffer, 0, decodedLength));

        } catch (JSchException e) {
            e.printStackTrace();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    public static void main(String[] args) {
        // 연결 확인용 코드
        Session jschSession = sessionConnect();

//        String localFile = "test.txt";
//        String remoteFile = "/home/ubuntu/test.txt";
//        fileTransfer(jschSession, localFile, remoteFile, false);

//        String script = "/home/hadoop/hadoop/bin/hdfs dfs -cat keyword_out2/part-r-00000";
//        String script = "touch touch.txt";
//        String result = cmd(jschSession, script);
//        System.out.println("result : " + result);

        sessionDisconnect(jschSession);
        System.out.println("Done");
    }

}