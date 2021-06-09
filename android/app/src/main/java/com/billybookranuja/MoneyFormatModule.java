package com.billybookranuja; // replace com.your-app-name with your app’s name
import androidx.annotation.NonNull;
import java.text.NumberFormat;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.time.LocalDate;
import java.util.Map;
import java.util.HashMap;
import java.util.Currency;
import java.util.*;
public class MoneyFormatModule extends ReactContextBaseJavaModule {
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
    public  void getLocaleCurrency(Callback callback){
        Locale locale = mContext.getResources().getConfiguration().locale;
        callback.invoke(Currency.getInstance(locale).getCurrencyCode());
    }

    @Override
    public String getName() {
        return "MoneyFormat";
    }
}