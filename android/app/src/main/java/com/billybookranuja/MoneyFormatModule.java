package com.billybookranuja; // replace com.your-app-name with your app’s name
import android.content.Context;
import android.content.pm.PackageInfo;
import android.graphics.Color;
import android.os.Environment;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.NonNull;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.text.NumberFormat;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Currency;
import java.util.*;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

public class MoneyFormatModule extends ReactContextBaseJavaModule {
    public static LinkedBlockingQueue taskQueue = new LinkedBlockingQueue();
    public static ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(3,5,5000,TimeUnit.MILLISECONDS,taskQueue);
    ReactApplicationContext mContext;
    MoneyFormatModule(ReactApplicationContext context) {
        super(context);
        mContext = context;
    }

    @ReactMethod
    public void getCurrency(double amount,String currency, Callback  c){
        NumberFormat format = NumberFormat.getCurrencyInstance();
        format.setMaximumFractionDigits(2);
        format.setCurrency(Currency.getInstance(currency));
        c.invoke(format.format(amount));
    }


    @ReactMethod
    public void generatePopup(String message){
        // Toast toast = new Toast(mContext);
        // View view = toast.getView();
        // view.setBackgroundColor(Color.parseColor("#000000"));
        // toast.setGravity(Gravity.BOTTOM,);
    }
    @ReactMethod
    public void saveCSVFile(String fileName, String data, Promise promise){
        threadPoolExecutor.execute(new Runnable() {
            @Override
            public void run() {
                File file = new File(getPathToStoreDate() ,fileName);

                Log.i("Path",getPathToStoreDate());

                try {
                    byte[] bytes = data.getBytes("UTF-8");
                    FileOutputStream fileOutputStream = null;
                    try {
                        fileOutputStream=new FileOutputStream(file,true);
                        fileOutputStream.write(bytes);
                        promise.resolve(fileName + " Save Successfully.");
                    } catch (FileNotFoundException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    } finally {
                        if(fileOutputStream != null){
                            try {
                                fileOutputStream.close();
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }

                    }
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
//                try {
//                    file.createNewFile();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }

                promise.reject("20","Can't able to do");
            }
        });
    }

    public  String getPathToStoreDate(){
        return Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).getAbsolutePath();
    }

    @ReactMethod
    public  void getAndroidVersion(Callback callback){
        try{
            PackageInfo packageInfo  = mContext.getPackageManager().getPackageInfo(mContext.getPackageName(),0);
            String androidVersion = packageInfo.versionName;
            callback.invoke(androidVersion,null);
        }
        catch (Exception e){
            e.printStackTrace();
            callback.invoke(null,e.getMessage());
        }
    }
    @ReactMethod
    public  void getLocaleCurrency(Callback callback){
        Locale locale = mContext.getResources().getConfiguration().locale;
        callback.invoke(Currency.getInstance(locale).getCurrencyCode());
    }

    @Override
    public String getName() {
        return "MoneyFormat";
    }
}